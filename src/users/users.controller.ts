import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('forgot-password')
  sendForgotPasswordEmail(@Body() forgotPassowordDto: any) {
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
