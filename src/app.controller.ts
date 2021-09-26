import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<{ accesss_token: string }> {
    try {
      const login = await this.authService.login(req.user);
      return login;
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    try {
      const user = req.user;
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
