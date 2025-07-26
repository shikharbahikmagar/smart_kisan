import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyOrderItemsTable1753435561178 implements MigrationInterface {
    name = 'ModifyOrderItemsTable1753435561178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_items_item_status_enum" AS ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded')`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "item_status" "public"."order_items_item_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TYPE "public"."orders_order_status_enum" RENAME TO "orders_order_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_status_enum" AS ENUM('pending', 'processing', 'partial_shipped', 'shipped', 'completed', 'cancelled', 'refunded')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_status" TYPE "public"."orders_order_status_enum" USING "order_status"::"text"::"public"."orders_order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_order_status_enum_old" AS ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_status" TYPE "public"."orders_order_status_enum_old" USING "order_status"::"text"::"public"."orders_order_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_order_status_enum_old" RENAME TO "orders_order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "item_status"`);
        await queryRunner.query(`DROP TYPE "public"."order_items_item_status_enum"`);
    }

}
