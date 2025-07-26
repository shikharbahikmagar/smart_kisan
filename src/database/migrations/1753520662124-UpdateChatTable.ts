import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateChatTable1753520662124 implements MigrationInterface {
    name = 'UpdateChatTable1753520662124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "senderName"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "receiverId" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_receiverrole_enum" AS ENUM('farmer', 'expert')`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "receiverRole" "public"."chat_messages_receiverrole_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "senderRole"`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_senderrole_enum" AS ENUM('farmer', 'expert')`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "senderRole" "public"."chat_messages_senderrole_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_fc6b58e41e9a871dacbe9077def" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_9a197c82c9ea44d75bc145a6e2c" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_9a197c82c9ea44d75bc145a6e2c"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_fc6b58e41e9a871dacbe9077def"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "senderRole"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_senderrole_enum"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "senderRole" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "receiverRole"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_receiverrole_enum"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "receiverId"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "senderName" character varying NOT NULL`);
    }

}
