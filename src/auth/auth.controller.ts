import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { GetUserFromRequest } from './customDecorator/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/refresh-jwt.guard';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServide: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Res({ passthrough: true }) response: Response,
    @GetUserFromRequest() user: any,
    @Body() body: any,
  ) {
    return this.authServide.login(user, response, body);
  }

  @Post('activate/:token')
  activateUser(@Param() params: TokenDto) {
    return this.authServide.activateUser(params.token);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  test2() {
    return 'refreshtoken';
  }
}
