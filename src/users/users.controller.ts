import { Controller, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('forgot-password')
  sendForgotPasswordEmail(@Body() forgotPassowordDto: ForgotPasswordDto) {
    return this.usersService.sendForgotPasswordEmail(forgotPassowordDto);
  }

  @Post('forgot-password/:token')
  resetForgotPassword(
    @Body() forgotPassowordDto: any,
    @Param('token') token: string,
  ) {
    return this.usersService.resetForgotPassword(token, forgotPassowordDto);
  }
}
