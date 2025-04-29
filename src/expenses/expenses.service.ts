import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class ExpensesService {


  constructor(
    private readonly entityManager: EntityManager
  ) { }

  async create(createExpenseDto: CreateExpenseDto) {

    const { amount, description, monthId, typeId } = createExpenseDto

    try {
      const newExpense = await this.entityManager.query(`
        
        INSERT INTO expenses(amount, description , month_id, type_id), VALUES (?, ?, ?)
        
        `, [amount, description, monthId, typeId])

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
