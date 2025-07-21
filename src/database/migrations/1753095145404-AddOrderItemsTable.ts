import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderItemsTable1753095145404 implements MigrationInterface {
    name = 'AddOrderItemsTable1753095145404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8624dad595ae567818ad9983b33"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cd13410cb3419e4648803cfbcb0"`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" integer NOT NULL, "productId" integer NOT NULL, "farmerShopId" integer NOT NULL, "quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, "totalPrice" numeric(10,2) NOT NULL, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "qty"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "farmerShopId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "full_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "phone" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_e9775a6762e2427847079fcbcb5" FOREIGN KEY ("farmerShopId") REFERENCES "farmer_shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_e9775a6762e2427847079fcbcb5"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "farmerShopId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "qty" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cd13410cb3419e4648803cfbcb0" FOREIGN KEY ("farmerShopId") REFERENCES "farmer_shops"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_8624dad595ae567818ad9983b33" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
