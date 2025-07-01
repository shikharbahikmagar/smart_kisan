import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySliderTable1751365629196 implements MigrationInterface {
    name = 'ModifySliderTable1751365629196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sliders" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sliders" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

}
