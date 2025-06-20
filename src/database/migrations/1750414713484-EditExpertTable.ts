import { MigrationInterface, QueryRunner } from "typeorm";

export class EditExpertTable1750414713484 implements MigrationInterface {
    name = 'EditExpertTable1750414713484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experts" DROP COLUMN "verified"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experts" ADD "verified" boolean NOT NULL`);
    }

}
