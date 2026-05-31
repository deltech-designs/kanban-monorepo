import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  @IsOptional()
  credential?: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Google ID is required' })
  googleId!: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
