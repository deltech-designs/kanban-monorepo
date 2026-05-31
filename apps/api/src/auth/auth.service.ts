import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { AuthRepository } from './auth.repository';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { GoogleLoginDto } from './dtos/google-login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { getEnvVar } from '@kanban/utils';

export class AuthService {
  private readonly jwtSecret: string;

  constructor(private readonly authRepository: AuthRepository) {
    this.jwtSecret = getEnvVar('JWT_SECRET', 'super-secret-hiram-board-key');
  }

  async register(dto: RegisterUserDto) {
    const existing = await this.authRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email is already registered');
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    // Generate a 4-digit OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const newUser = await this.authRepository.create({
      _id: userId,
      email: dto.email.toLowerCase(),
      name: dto.name,
      password: hashedPassword,
      otpCode,
      otpExpiresAt,
      isVerified: false,
    });

    // Dynamic console logging of the verification code
    console.log('\n======================================================');
    console.log(`✉️  [EMAIL MOCK] Sending OTP verification to ${dto.email}`);
    console.log(`🔑  YOUR VERIFICATION CODE IS: ${otpCode}`);
    console.log('======================================================\n');

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      isVerified: newUser.isVerified,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.isVerified) {
      return user; // Already verified
    }

    if (!user.otpCode || !user.otpExpiresAt || user.otpCode !== dto.otp) {
      throw new Error('Invalid verification code');
    }

    if (new Date() > user.otpExpiresAt) {
      throw new Error('Verification code has expired');
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpiresAt = undefined;

    await this.authRepository.save(user);
    return user;
  }

  async login(dto: LoginUserDto) {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.password) {
      throw new Error('This account uses Google Sign-In. Please sign in with Google.');
    }

    const matches = await bcrypt.compare(dto.password, user.password);
    if (!matches) {
      throw new Error('Invalid email or password');
    }

    if (!user.isVerified) {
      // Regenerate OTP for unverified accounts
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      user.otpCode = otpCode;
      user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await this.authRepository.save(user);

      // console.log('\n======================================================');
      // console.log(`✉️  [EMAIL MOCK] Account unverified. Sending fresh OTP to ${user.email}`);
      // console.log(`🔑  YOUR VERIFICATION CODE IS: ${otpCode}`);
      // console.log('======================================================\n');

      throw new Error('UNVERIFIED');
    }

    return user;
  }

  async googleLogin(dto: GoogleLoginDto) {
    let email = dto.email.toLowerCase();
    let name = dto.name;
    let googleId = dto.googleId;
    let avatar = dto.avatar;

    // In a live environment, if `dto.credential` is present, we would verify it using Google Library:
    // const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    // const ticket = await client.verifyIdToken({ idToken: dto.credential, audience: GOOGLE_CLIENT_ID });
    // const payload = ticket.getPayload();
    // email = payload.email; name = payload.name; googleId = payload.sub; avatar = payload.picture;

    let user = await this.authRepository.findByGoogleId(googleId);

    if (!user) {
      // Check if user exists with the same email
      user = await this.authRepository.findByEmail(email);

      if (user) {
        // Link Google Account to existing email account
        user.googleId = googleId;
        if (avatar && !user.avatar) {
          user.avatar = avatar;
        }
        user.isVerified = true; // Auto-verify
        await this.authRepository.save(user);
      } else {
        // Create new Google Auth user
        user = await this.authRepository.create({
          _id: uuidv4(),
          email,
          name,
          googleId,
          avatar,
          isVerified: true,
        });
      }
    } else {
      // User exists with this Google ID, update profile info if changed
      let hasChanges = false;
      if (user.name !== name) {
        user.name = name;
        hasChanges = true;
      }
      if (avatar && user.avatar !== avatar) {
        user.avatar = avatar;
        hasChanges = true;
      }
      if (hasChanges) {
        await this.authRepository.save(user);
      }
    }

    return user;
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      // For security, don't expose that the user doesn't exist
      return;
    }

    const resetToken = uuidv4();
    user.resetToken = resetToken;
    user.resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
    await this.authRepository.save(user);

    const resetLink = `${getEnvVar('CLIENT_URL')}/auth/reset-password?token=${resetToken}`;
    
    console.log('\n======================================================');
    console.log(`✉️  [EMAIL MOCK] Password Reset Link for ${dto.email}`);
    console.log(`🔗  RESET PASSWORD LINK: ${resetLink}`);
    console.log('======================================================\n');
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.authRepository.findByResetToken(dto.token);
    if (!user) {
      throw new Error('Password reset token is invalid or has expired');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;
    await this.authRepository.save(user);
  }

  generateToken(user: any): string {
    return jwt.sign(
      {
        id: user._id || user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      this.jwtSecret,
      { expiresIn: '7d' }
    );
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      return null;
    }
  }
}
