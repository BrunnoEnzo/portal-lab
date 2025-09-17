import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerStudent(@Body(new ValidationPipe()) dto: RegisterStudentDto) {
    return this.authService.registerStudent(dto);
  }

  @Post('login')
  login(@Body(new ValidationPipe()) dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('social-login')
  handleSocialLogin(@Body(new ValidationPipe()) dto: SocialLoginDto) {
    return this.authService.handleSocialLogin(dto);
  }
}