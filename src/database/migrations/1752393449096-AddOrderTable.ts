import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderTable1752393449096 implements MigrationInterface {
    name = 'AddOrderTable1752393449096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farmer_shops" DROP CONSTRAINT "FK_fa49bf45002aa41fa90e188b6ea"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_status_enum" AS ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded')`);
        await queryRunner.query(`CREATE TYPE "public"."orders_paymentmethod_enum" AS ENUM('cash_on_delivery', 'esewa', 'khalti')`);
        await queryRunner.query(`CREATE TYPE "public"."orders_paymentstatus_enum" AS ENUM('pending', 'completed', 'failed', 'refunded', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "s_address" character varying(255) NOT NULL, "s_city" character varying(255) NOT NULL, "s_province" character varying(255) NOT NULL, "s_tole" character varying(255) NOT NULL, "qty" integer NOT NULL, "totalPrice" numeric(10,2) NOT NULL, "order_status" "public"."orders_order_status_enum" NOT NULL DEFAULT 'pending', "paymentMethod" "public"."orders_paymentmethod_enum" NOT NULL DEFAULT 'cash_on_delivery', "paymentStatus" "public"."orders_paymentstatus_enum" NOT NULL DEFAULT 'pending', "userId" integer NOT NULL, "farmerShopId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" DROP COLUMN "productsId"`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" DROP CONSTRAINT "FK_76d85a8f3a8925e48c996388c6b"`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" ADD CONSTRAINT "UQ_76d85a8f3a8925e48c996388c6b" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_8624dad595ae567818ad9983b33" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cd13410cb3419e4648803cfbcb0" FOREIGN KEY ("farmerShopId") REFERENCES "farmer_shops"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" ADD CONSTRAINT "FK_76d85a8f3a8925e48c996388c6b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farmer_shops" DROP CONSTRAINT "FK_76d85a8f3a8925e48c996388c6b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cd13410cb3419e4648803cfbcb0"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8624dad595ae567818ad9983b33"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" DROP CONSTRAINT "UQ_76d85a8f3a8925e48c996388c6b"`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" ADD CONSTRAINT "FK_76d85a8f3a8925e48c996388c6b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" ADD "productsId" integer`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_paymentstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."orders_paymentmethod_enum"`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "farmer_shops" ADD CONSTRAINT "FK_fa49bf45002aa41fa90e188b6ea" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
