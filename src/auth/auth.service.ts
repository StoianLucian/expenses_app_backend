import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.userService.findUserByEmail(email);

      const isMatch = await compare(pass, user[0].password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const { password, ...result } = user[0];

      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async login(user: any, response: Response, body: any) {
    const { remember } = body;

    const token = this.jwtService.sign(user, {
      secret: 'test2',
      expiresIn: '1d',
    });

    response.cookie('AUTH_TOKEN', token, {
      httpOnly: true,
      maxAge: 86400000, //1day
      secure: false,
    });

    if (remember) {
      const refreshToken = this.jwtService.sign(user, {
        secret: 'test2',
        expiresIn: '7d',
      });
      response.cookie('REFRESH_TOKEN', refreshToken, {
        httpOnly: true,
        maxAge: 604800000, //7day
        secure: false,
      });
    }

    return { message: `Succesfully logged in as ${user.email}`, user: user };
  }
}
