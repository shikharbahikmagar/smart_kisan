import { MigrationInterface, QueryRunner } from "typeorm";

export class AddKnowledgeCategoryAndAlterArticle1751617479838 implements MigrationInterface {
    name = 'AddKnowledgeCategoryAndAlterArticle1751617479838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "knowledge_categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text, "imageUrl" character varying(255), CONSTRAINT "UQ_f07dd0b51a3b1e98c70fb204f75" UNIQUE ("name"), CONSTRAINT "PK_f375eb3a44a662e21f05797e554" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "knowledge_articles" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "knowledge_articles" ADD CONSTRAINT "FK_0225a5d7b5f6e406b187b40ab23" FOREIGN KEY ("categoryId") REFERENCES "knowledge_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "knowledge_articles" DROP CONSTRAINT "FK_0225a5d7b5f6e406b187b40ab23"`);
        await queryRunner.query(`ALTER TABLE "knowledge_articles" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "knowledge_categories"`);
    }

}
