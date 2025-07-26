import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChatTable1753518038877 implements MigrationInterface {
    name = 'AddChatTable1753518038877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_messages" ("id" SERIAL NOT NULL, "room" character varying NOT NULL, "senderId" integer NOT NULL, "senderRole" character varying NOT NULL, "senderName" character varying NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40c55ee0e571e268b0d3cd37d10" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "chat_messages"`);
    }

}
