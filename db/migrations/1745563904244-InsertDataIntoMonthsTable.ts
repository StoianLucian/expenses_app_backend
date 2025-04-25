import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDataIntoMonthsTable1745563904244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO months (name)
        VALUES 
            ('January'),
            ('February'),
            ('March'),
            ('April'),
            ('May'),
            ('June'),
            ('July'),
            ('August'),
            ('September'),
            ('October'),
            ('November'),
            ('December');
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
           DELETE FROM months 
                WHERE name IN (
                    'January', 
                    'February', 
                    'March', 
                    'April', 
                    'May', 
                    'June', 
                    'July', 
                    'August', 
                    'September', 
                    'October', 
                    'November', 
                    'December'
                );
        `)
    }

}
