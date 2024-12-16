import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDataIntoUserRoles1733419104731
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO user_roles (role)
        VALUES 
            ('Admin'),
            ('User');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM user_roles WHERE role IN ('Admin', 'User');
    `);
  }
}
