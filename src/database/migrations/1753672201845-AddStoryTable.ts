import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStoryTable1753672201845 implements MigrationInterface {
    name = 'AddStoryTable1753672201845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" character varying NOT NULL, "farmerId" integer NOT NULL, CONSTRAINT "REL_80ef621bf8bf2cb71cd3945a8e" UNIQUE ("farmerId"), CONSTRAINT "PK_bb6f880b260ed96c452b32a39f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stories" ADD CONSTRAINT "FK_80ef621bf8bf2cb71cd3945a8ea" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stories" DROP CONSTRAINT "FK_80ef621bf8bf2cb71cd3945a8ea"`);
        await queryRunner.query(`DROP TABLE "stories"`);
    }

}
