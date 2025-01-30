import { IsString, MinLength } from 'class-validator';

export class TokenDto {
  @IsString()
  @MinLength(32, { message: 'invalid token' })
  token: string;
}
