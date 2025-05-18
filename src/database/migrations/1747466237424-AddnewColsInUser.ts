import { MigrationInterface, QueryRunner } from "typeorm";

export class AddnewColsInUser1747466237424 implements MigrationInterface {
    name = 'AddnewColsInUser1747466237424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email_verified_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email_verification_token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email_verification_token_expires_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_reset_token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_reset_token_expires_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_reset_token_expires_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_reset_token"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email_verification_token_expires_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email_verification_token"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email_verified_at"`);
    }

}
