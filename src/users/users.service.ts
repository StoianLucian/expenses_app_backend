import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/mail/mail.service';
import { TemplatesTypes } from 'src/mail/types/email';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly mailService: MailService,
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
  ) { }

  async isUserUnique(data: any) {
    const { email } = data;

    const existingUser = await this.entityManager.query(
      `
      SELECT * FROM users WHERE email = ?
      `,
      [data.email],
    );

    if (existingUser.length > 0 && existingUser[0].email === email) {
      return { error: true, message: 'user already exists' };
    } else {
      return { error: false, message: '' };
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    try {
      await this.validateUserIsUnique(createUserDto.email);

      const hashedPassword = await this.hashPassword(password);

      const user = await this.entityManager.query(
        `INSERT INTO users (email, password, roleId) values (?, ?, ?)`,
        [email, hashedPassword, 1],
      );

      const token = await this.tokenService.generateResetToken(email);

      const context = {
        token: token,
        email: email,
      };
      await this.mailService.sendEmail(
        email,
        'Activate account',
        TemplatesTypes.ACTIVATE_ACCOUNT,
        context,
      );

      return {
        message: `User created, an email was sent in order to activate the account`,
      };
    } catch (error) {
      throw error;
    }
  }

  async sendForgotPasswordEmail(forgotPassowrdDto: any) {
    const { email } = forgotPassowrdDto;

    try {
      const user = await this.findUserByEmail(email);
      const token = await this.tokenService.generateResetToken(user.email);

      const context = { name: user.email, token: token };

      await this.mailService.sendEmail(
        email,
        'Reset password',
        TemplatesTypes.RESET_PASSWORD,
        context,
      );

      return { message: 'An email was send to reset your password' };
    } catch (error) {
      throw error;
    }
  }

  async resendActivateAccountEmail(token: string | undefined) {

    try {
      const foundToken = await this.tokenService.findToken(token)

      const generatedToken = await this.tokenService.generateResetToken(foundToken.email)

      const context = {
        email: foundToken.email,
        token: generatedToken,
      }

      await this.mailService.sendEmail(
        foundToken.email,
        'Resend activation account token',
        TemplatesTypes.RESENT_ACTIVATE_ACCOUNT_TOKEN,
        context,
      );
      return { message: 'An email was send to activate your account' };
    } catch (error) {
      throw error
    }
  }

  async resetForgotPassword(token: string, forgotPassowordDto: any) {
    try {
      const { email, password, confirmPassword } = forgotPassowordDto;

      const foundToken = await this.tokenService.validateToken(token, email);

      const user = await this.findUserByEmail(foundToken.email);

      const hashedPassword = await bcrypt.hash(password, 10);

      const resetPassword = await this.entityManager.query(
        `
        UPDATE users 
        SET password = ?
        WHERE email = ?
        `,
        [hashedPassword, user.email],
      );

      await this.tokenService.clearToken(foundToken.token);

      return {
        statusCode: HttpStatus.OK,
        message: 'password changed successfully',
      };
    } catch (error) {
      throw error
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.entityManager.query(
        `SELECT * FROM users WHERE id = ?`,
        [id],
      );

      if (user.length === 0) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.entityManager.query(
        `
        SELECT * FROM users WHERE email = ?
        `,
        [email],
      );

      if (user.length === 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            errors: [{ email: 'user not found' }],
            message: 'UNAUTHORIZED',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async validateUserIsUnique(email: string) {
    const existingUser = await this.entityManager.query(
      `
      SELECT * FROM users WHERE email = ?
      `,
      [email],
    );

    if (existingUser.length > 0 && existingUser[0].email === email) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          errors: [{ email: 'email already in use' }],
          message: 'UNAUTHORIZED',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
