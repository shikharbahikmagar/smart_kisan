import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExpertTable1753545702688 implements MigrationInterface {
    name = 'UpdateExpertTable1753545702688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experts" DROP CONSTRAINT "UQ_25a7963318ab2964769e8da9f7e"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experts" ADD CONSTRAINT "UQ_25a7963318ab2964769e8da9f7e" UNIQUE ("qualification")`);
    }

}
