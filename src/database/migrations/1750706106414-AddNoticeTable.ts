import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNoticeTable1750706106414 implements MigrationInterface {
    name = 'AddNoticeTable1750706106414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notices" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "image" character varying, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3eb18c29da25d6935fcbe584237" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notices"`);
    }

}
