import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductTable1750530019054 implements MigrationInterface {
    name = 'AddProductTable1750530019054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "image" character varying(255), "stock" character varying NOT NULL, "farmerShopId" integer NOT NULL, "discountedPrice" numeric(10,2), "discountPercentage" integer NOT NULL DEFAULT '0', "isDiscountActive" boolean NOT NULL DEFAULT false, "discountStart" TIMESTAMP, "discountEnd" TIMESTAMP, "isFeatured" boolean NOT NULL DEFAULT false, "isAvailable" boolean NOT NULL DEFAULT false, "categoryId" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" ADD "productsId" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_a157fcdd3c0ecfd55aeb4a31f59" FOREIGN KEY ("farmerShopId") REFERENCES "farmer_shops"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" ADD CONSTRAINT "FK_fa49bf45002aa41fa90e188b6ea" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farmer_shops" DROP CONSTRAINT "FK_fa49bf45002aa41fa90e188b6ea"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_a157fcdd3c0ecfd55aeb4a31f59"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" DROP COLUMN "productsId"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
