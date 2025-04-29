import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExpensesTable1745903751635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`expenses\` (
                \`id\` int NOT NULL AUTO_INCREMENT, 
                \`amount\` NUMERIC(10,2) NOT NULL, 
                \`description\` varchar(255) NOT NULL, 
                \`transaction_date\` DATE NOT NULL,
                \`month_id\` INT,
                \`type_id\` INT,
                \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` DATE NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`FK_month_id\` FOREIGN KEY (\`month_id\`) REFERENCES \`months\`(\`id\`),
                CONSTRAINT \`FK_type_id\` FOREIGN KEY (\`type_id\`) REFERENCES \`expenses_type\`(\`id\`)

                )
                ENGINE=InnoDB
            `)
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`expenses\`
            `)
    }

}
