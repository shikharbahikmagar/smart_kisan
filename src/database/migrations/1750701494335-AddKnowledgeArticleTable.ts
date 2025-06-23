import { MigrationInterface, QueryRunner } from "typeorm";

export class AddKnowledgeArticleTable1750701494335 implements MigrationInterface {
    name = 'AddKnowledgeArticleTable1750701494335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "knowledge_articles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "image" character varying(255), "publishedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4dff86fc9e08f53fe1d4cfe5fb1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "knowledge_articles"`);
    }

}
