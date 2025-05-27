import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFarmerShopTable1748364213076 implements MigrationInterface {
    name = 'AddFarmerShopTable1748364213076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "farmer_shops" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "shopName" character varying NOT NULL, "shopAddress" character varying NOT NULL, "province" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "shopEmail" character varying, "shopDescription" character varying, "shopImage" character varying, "citizenshipFrontImage" character varying, "citizenshipBackImage" character varying, "panNumber" character varying, "isVerified" boolean NOT NULL DEFAULT false, "contactNumber" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ce2a16f741e81106072272216d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" ADD CONSTRAINT "FK_76d85a8f3a8925e48c996388c6b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farmer_shops" DROP CONSTRAINT "FK_76d85a8f3a8925e48c996388c6b"`);
        await queryRunner.query(`DROP TABLE "farmer_shops"`);
    }

}
