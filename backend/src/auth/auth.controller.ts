import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }


  @Post('register')
  async register(@Body() dto: { email: string; password: string }) {
    const user = await this.authService.createUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('User already exists');
    }
    return { message: 'User registered successfully', user };
  }
}
