import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToExpensesTable1746266108303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            
            ALTER TABLE expenses
            ADD COLUMN user_id int NOT NULL;
            `)

        await queryRunner.query(`
            ALTER TABLE expenses
            ADD CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE expenses
            DROP FOREIGN KEY FK_user_id;
        `);

        await queryRunner.query(`
            ALTER TABLE expenses
            DROP COLUMN user_id;
            `)
    }

}
