import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { validateDto } from '../middleware/validateDto';
import { authenticate } from '../middleware/authenticate';

import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { GoogleLoginDto } from './dtos/google-login.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

const router: Router = Router();
const service = new AuthService(new AuthRepository());
const controller = new AuthController(service);

router.post('/register', validateDto(RegisterUserDto), controller.register.bind(controller));
router.post('/login', validateDto(LoginUserDto), controller.login.bind(controller));
router.post('/google', validateDto(GoogleLoginDto), controller.googleLogin.bind(controller));
router.post('/verify-otp', validateDto(VerifyOtpDto), controller.verifyOtp.bind(controller));
router.post('/forgot-password', validateDto(ForgotPasswordDto), controller.forgotPassword.bind(controller));
router.post('/reset-password', validateDto(ResetPasswordDto), controller.resetPassword.bind(controller));
router.post('/logout', controller.logout.bind(controller));
router.get('/me', authenticate, controller.me.bind(controller));

export default router;
export { service as authServiceInstance }; // Exporting the service instance so it can be used for JWT verification inside other middlewares
