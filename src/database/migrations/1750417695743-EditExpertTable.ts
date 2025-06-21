import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditExpertTable1750417695743 implements MigrationInterface {
  name = 'EditExpertTable1750417695743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "experts" ADD "expertise" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "experts" ALTER COLUMN "bio" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "experts" ALTER COLUMN "qualification" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "experts" ALTER COLUMN "experience_years" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "experts" DROP COLUMN "availability"`);
    await queryRunner.query(`ALTER TABLE "experts" ADD "availability" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "experts" DROP COLUMN "availability"`);
    await queryRunner.query(
      `ALTER TABLE "experts" ADD "availability" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "experts" ALTER COLUMN "experience_years" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "experts" ALTER COLUMN "qualification" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "experts" ALTER COLUMN "bio" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "experts" DROP COLUMN "expertise"`);
  }
}
