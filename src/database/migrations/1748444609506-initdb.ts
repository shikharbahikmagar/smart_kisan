import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initdb1748444609506 implements MigrationInterface {
  name = 'Initdb1748444609506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "farmer_shops" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "shopName" character varying NOT NULL, "shopAddress" character varying NOT NULL, "province" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "shopEmail" character varying, "shopDescription" character varying, "shopImage" character varying, "citizenshipFrontImage" character varying, "citizenshipBackImage" character varying, "panNumber" character varying, "isVerified" boolean NOT NULL DEFAULT false, "contactNumber" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ce2a16f741e81106072272216d8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin', 'expert', 'farmer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "contactNumber" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "email_verified_at" TIMESTAMP, "email_verification_token" character varying, "email_verification_token_expires_at" TIMESTAMP, "password_reset_token" character varying, "password_reset_token_expires_at" TIMESTAMP, "password" character varying NOT NULL, "avatar" character varying, "isVerified" boolean NOT NULL DEFAULT false, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "farmer_shops" ADD CONSTRAINT "FK_76d85a8f3a8925e48c996388c6b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "farmer_shops" DROP CONSTRAINT "FK_76d85a8f3a8925e48c996388c6b"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "farmer_shops"`);
  }
}
