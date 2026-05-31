import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setSessionCookie(res: Response, token: string): void {
    res.cookie('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  private clearSessionCookie(res: Response): void {
    res.clearCookie('session_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Registration failed',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.login(req.body);
      const token = this.authService.generateToken(user);
      this.setSessionCookie(res, token);

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          isVerified: user.isVerified,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      if (error.message === 'UNVERIFIED') {
        res.status(200).json({
          success: true,
          data: {
            email: req.body.email,
            isVerified: false,
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.status(400).json({
        success: false,
        error: error.message || 'Login failed',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.googleLogin(req.body);
      const token = this.authService.generateToken(user);
      this.setSessionCookie(res, token);

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          isVerified: user.isVerified,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Google Login failed',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.verifyOtp(req.body);
      const token = this.authService.generateToken(user);
      this.setSessionCookie(res, token);

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          isVerified: user.isVerified,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'OTP verification failed',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      await this.authService.forgotPassword(req.body);
      res.status(200).json({
        success: true,
        data: 'If this email is registered, a reset link has been logged.',
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Forgot password failed',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      await this.authService.resetPassword(req.body);
      res.status(200).json({
        success: true,
        data: 'Password has been reset successfully.',
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Password reset failed',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      this.clearSessionCookie(res);
      res.status(200).json({
        success: true,
        data: 'Logged out successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Logout failed',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: req.user,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve current user',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
