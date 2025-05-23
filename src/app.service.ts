import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {

  constructor(private readonly entityManager: EntityManager) { }

  async getMonths() {
    try {
      const months = await this.entityManager.query(`
        SELECT * from months
        `)

      return months
    } catch (error) {
      throw error;
    }
  }

  async getExpensesTypes() {
    try {
      const expensesType = await this.entityManager.query(`
        SELECT * from expenses_type
        `)

      return expensesType
    } catch (error) {
      throw error
    }
  }
}
