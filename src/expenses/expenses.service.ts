import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { EntityManager } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ExpensesService {


  constructor(
    private readonly entityManager: EntityManager
  ) { }

  async create(createExpenseDto: CreateExpenseDto, user: User) {

    const { amount, description, transactionDate, monthId, typeId } = createExpenseDto;

    try {
      const newExpense = await this.entityManager.query(
        `
      INSERT INTO expenses (amount, description, transaction_date, month_id, type_id, user_id) VALUES (?, ?, ?, ?, ?, ?)
      `,
        [amount, description, transactionDate, monthId, typeId, user.id],
      );

      return "expense created"

    } catch (error) {
      throw error
    }

  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
