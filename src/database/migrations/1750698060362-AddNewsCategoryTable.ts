import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewsCategoryTable1750698060362 implements MigrationInterface {
    name = 'AddNewsCategoryTable1750698060362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "image" text NOT NULL, CONSTRAINT "PK_20eed6c3ae534e7721fa44874a3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news_categories"`);
    }

}
