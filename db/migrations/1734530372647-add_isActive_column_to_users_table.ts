import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveColumnToUsersTable_1734529362509
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN is_active BOOLEAN DEFAULT false;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN is_active;
    `);
  }
}
