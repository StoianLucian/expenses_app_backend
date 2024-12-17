import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/mail/mail.service';
import { TemplatesTypes } from 'src/mail/types/email';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.validateUserIsUnique(createUserDto.email);

      createUserDto.password = await this.hashPassword(createUserDto.password);

      const user = await this.entityManager.query(
        `INSERT INTO users (email, password, roleId) values (?, ?, ?)`,
        [createUserDto.email, createUserDto.password, createUserDto.roleId],
      );

      return {
        message: `User created, an email was sent in order to acctivate the account`,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async sendForgotPasswordEmail(forgotPassowrdDto: any) {
    const { email } = forgotPassowrdDto;

    try {
      const user = await this.findUserByEmail(email);
      // const token = await this.tokenService.generateResetToken(user[0].email);

      const context = { name: user[0].email };

      await this.mailService.sendEmail(
        email,
        'Reset password',
        TemplatesTypes.RESET_PASSWORD,
        context,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
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

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
      SELECT email FROM users WHERE email = ?
      `,
      [email],
    );

    if (existingUser[0]) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }
  }

  async generateResetToken(email: string) {
    const generatedToken = randomBytes(32).toString('hex');

    const token = await this.entityManager.query(
      `
        INSERT INTO tokens (token, email, expiry_date) values (?, ?, ?)
      `,
      [generatedToken, email, '2024-12-18'],
    );
  }
}
