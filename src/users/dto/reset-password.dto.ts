import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { specialCharRegex, lowerCaseRegex, upperCaseRegex, numbersRegex } from "db/shared/regex";

export class resetPassword {
    @IsEmail()
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

    @IsNotEmpty({ message: 'Confirm password is required' })
    @IsString()
    @MinLength(10, {
        message: 'Confirm password must be at lest 10 characters long',
    })
    @Matches(specialCharRegex, {
        message: 'Confirm password must contain at least one special character',
    })
    @Matches(lowerCaseRegex, {
        message: 'Confirm password must contain at least one lower case character',
    })
    @Matches(upperCaseRegex, {
        message: 'Confirm password must contain at least one upper case character',
    })
    @Matches(numbersRegex, {
        message: 'Confirm password must contain at least on number',
    })
    confirmPassword: string;
}