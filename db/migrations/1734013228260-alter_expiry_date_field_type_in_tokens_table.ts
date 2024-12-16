import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterExpiryDateFieldTypeInTokensTable1734013228260
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE tokens
            MODIFY COLUMN expiry_date DATETIME NOT NULL
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE tokens
        MODIFY COLUMN expiry_date DATE NOT NULL
        `);
  }
}
