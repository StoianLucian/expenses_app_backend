import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("utils")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("months")
  getHello() {
    return this.appService.getMonths();
  }

  @Get("expenses_types")
  getExpensesTypes() {
    return this.appService.getExpensesTypes();
  }
}
