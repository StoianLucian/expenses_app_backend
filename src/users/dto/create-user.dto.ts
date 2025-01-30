import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import {
  lowerCaseRegex,
  numbersRegex,
  specialCharRegex,
  upperCaseRegex,
} from 'db/shared/regex';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(10, { message: 'Password must be at lest 10 characters long' })
  @Matches(specialCharRegex, {
    message: 'Password must contain at least one special character',
  })
  @Matches(lowerCaseRegex, {
    message: 'Password must contain at least one lower case character',
  })
  @Matches(upperCaseRegex, {
    message: 'Password must contain at least one upper case character',
  })
  @Matches(numbersRegex, {
    message: 'Password must contain at least on number',
  })
  password: string;

  // roleId: number; sets default to 1
}
