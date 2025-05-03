import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetUserFromRequest } from 'src/auth/customDecorator/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createExpenseDto: CreateExpenseDto, @GetUserFromRequest() user: User,) {
    return this.expensesService.create(createExpenseDto, user);
  }
}
