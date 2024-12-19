import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { EntityManager } from 'typeorm';
import { randomBytes } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly entityManager: EntityManager,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async sendForgotPasswordEmail(createTokenDto: CreateTokenDto) {
    try {
      const { email } = createTokenDto;

      const user = await this.usersService.findUserByEmail(email);
      const generatedToken = this.generateToken(32);
      const currentDate = new Date();

      const token = await this.entityManager.query(
        `
      INSERT INTO tokens (email, token, expiry_date) VALUES (?, ?, ?)
      `,
        [user.email, generatedToken, currentDate],
      );

      const tokenId = await this.entityManager.query(
        `SELECT LAST_INSERT_ID() AS id`,
      );
      const foundToken = await this.entityManager.query(
        `
        SELECT * FROM tokens WHERE id = ?

        `,
        [tokenId[0].id],
      );

      return 'test';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  generateToken(number: number) {
    const token = randomBytes(number).toString('hex');

    return token;
  }

  async generateResetToken(email: string) {
    const generatedToken = randomBytes(32).toString('hex');

    const token = await this.entityManager.query(
      `
        INSERT INTO tokens (token, email, expiry_date) values (?, ?, ?)
      `,
      [generatedToken, email, '2024-12-18'],
    );

    return generatedToken;
  }

  async validateToken(token: string, email: string) {
    const foundToken = await this.findToken(token);

    if (foundToken.email !== email) {
      throw new UnauthorizedException();
    }

    return foundToken;
  }

  async findToken(token: string) {
    const foundToken = await this.entityManager.query(
      `
      SELECT * FROM tokens where token = ?
      `,
      [token],
    );

    if (foundToken.length === 0) {
      throw new HttpException('UNAUTHORIzED', HttpStatus.FORBIDDEN);
    }

    return foundToken[0];
  }
}
