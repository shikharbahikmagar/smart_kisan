import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewsTable1750696176915 implements MigrationInterface {
    name = 'AddNewsTable1750696176915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_c3421549445302391be9ca7ed84"`);
        await queryRunner.query(`CREATE TABLE "News" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "imageUrl" character varying(255), "publishedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_109fa61fff0eb3997a2890f52c0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "News"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "UQ_c3421549445302391be9ca7ed84" UNIQUE ("productId", "userId")`);
    }

}
