import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSliderTable1751365007553 implements MigrationInterface {
    name = 'AddSliderTable1751365007553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sliders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "image" character varying, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_fc605f415269f62f152135843ab" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sliders"`);
    }

}
