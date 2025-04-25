import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMonthsTable1745563342418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`months\` (\`id\` INT NOT NULL AUTO_INCREMENT, \`name\` varchar(225) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`months\`
            `)
    }

}
