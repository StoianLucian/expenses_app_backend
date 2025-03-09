import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
    private readonly entityManager: EntityManager,
  ) { }

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.userService.findUserByEmail(email);

      const isMatch = await compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(user: any, response: Response, body: any) {
    try {
      const { remember } = body;

      await this.checkUserActive(user.id);

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
    } catch (error) {
      throw error;
    }
  }

  async activateUser(token: string) {

    try {
      const { email, token: foundToken } =
        await this.tokenService.findToken(token);

      await this.setUserActive(email, foundToken);

      return `${email} activated`;
    } catch (error) {
      throw error;
    }

  }

  async checkUserActive(id: number) {
    const user = await this.userService.findUserById(id);

    if (user.is_active === 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          errors: [{ email: 'email is not active' }],
          message: 'UNAUTHORIZED',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async setUserActive(email: string, token: string) {
    await this.entityManager.query(
      `
      UPDATE users
      SET is_active = 1
      WHERE email = ?
      `,
      [email],
    );

    await this.tokenService.clearToken(token);
  }
}
