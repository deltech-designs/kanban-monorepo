import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'OTP is required' })
  otp!: string;
}
