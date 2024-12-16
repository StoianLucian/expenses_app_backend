import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailAndExpireDateToTokensTable1734009584523
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE tokens
        ADD COLUMN email VARCHAR(255) NOT NULL,
        ADD COLUMN expiry_date DATE NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE tokens
        DROP COLUMN expiry_date,
        DROP COLUMN email;
        `);
  }
}
