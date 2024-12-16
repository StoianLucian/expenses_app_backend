import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddForeignKeyToUsersAndUserRoles1733419681228
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users
            ADD CONSTRAINT FK_users_roleId
            FOREIGN KEY (roleId)
            REFERENCES user_roles(id)
            ON UPDATE CASCADE;
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users
            DROP FOREIGN KEY FK_users_roleId;
            `);
  }
}
