import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourMigrationName1733412572785 implements MigrationInterface {
  name = 'YourMigrationName1733412572785';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`user_roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB
            
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE \`user_roles\`
        `);
  }
}
