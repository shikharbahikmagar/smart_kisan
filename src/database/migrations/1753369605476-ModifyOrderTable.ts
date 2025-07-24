import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyOrderTable1753369605476 implements MigrationInterface {
    name = 'ModifyOrderTable1753369605476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "transactionId" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "transactionId"`);
    }

}
