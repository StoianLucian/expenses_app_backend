import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDataIntoExpensesTypeTable1745564964967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO expenses_type (type)
        VALUES 
            ('Expense'),
            ('Income')
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
           DELETE FROM expenses_type 
                WHERE name IN (
                    'Expense', 
                    'Income'
                );
        `)
    }

}
