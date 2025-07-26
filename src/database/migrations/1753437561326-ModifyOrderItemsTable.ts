import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyOrderItemsTable1753437561326 implements MigrationInterface {
    name = 'ModifyOrderItemsTable1753437561326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."order_items_item_status_enum" RENAME TO "order_items_item_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."order_items_item_status_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "order_items" ALTER COLUMN "item_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_items" ALTER COLUMN "item_status" TYPE "public"."order_items_item_status_enum" USING "item_status"::"text"::"public"."order_items_item_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order_items" ALTER COLUMN "item_status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."order_items_item_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_items_item_status_enum_old" AS ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded')`);
        await queryRunner.query(`ALTER TABLE "order_items" ALTER COLUMN "item_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_items" ALTER COLUMN "item_status" TYPE "public"."order_items_item_status_enum_old" USING "item_status"::"text"::"public"."order_items_item_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "order_items" ALTER COLUMN "item_status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."order_items_item_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_items_item_status_enum_old" RENAME TO "order_items_item_status_enum"`);
    }

}
