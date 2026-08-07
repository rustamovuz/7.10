import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ---------- GOOGLE ----------
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport avtomatik ravishda Google login sahifasiga yo'naltiradi
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const { accessToken } = await this.authService.validateOAuthLogin(req.user);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(`${frontendUrl}/oauth-success?token=${accessToken}`);
  }

  // ---------- GITHUB ----------
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // Passport avtomatik ravishda GitHub login sahifasiga yo'naltiradi
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req, @Res() res: Response) {
    const { accessToken } = await this.authService.validateOAuthLogin(req.user);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000 ';
    return res.redirect(`${frontendUrl}/oauth-success?token=${accessToken}`);
  }

  // ---------- HIMOYALANGAN NAMUNA ROUTE ----------
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}
