import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFarmerShopTable1753641787499 implements MigrationInterface {
    name = 'UpdateFarmerShopTable1753641787499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farmer_shops" RENAME COLUMN "shopImage" TO "FarmCertificate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farmer_shops" RENAME COLUMN "FarmCertificate" TO "shopImage"`);
    }

}
