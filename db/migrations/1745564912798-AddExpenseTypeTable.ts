import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExpenseTypeTable1745564912798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`expenses_type\` (\`id\` INT NOT NULL AUTO_INCREMENT, \`type\` varchar(225) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`expenses_type\`
            `)
    }

}
