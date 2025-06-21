import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExpertTable1750330166949 implements MigrationInterface {
  name = 'AddExpertTable1750330166949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "experts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "bio" character varying NOT NULL, "qualification" character varying NOT NULL, "experience_years" integer NOT NULL, "verified" boolean NOT NULL, "availability" character varying, CONSTRAINT "UQ_25a7963318ab2964769e8da9f7e" UNIQUE ("qualification"), CONSTRAINT "REL_2728a584942d4f966841383195" UNIQUE ("userId"), CONSTRAINT "PK_8ecb9ec7e8b977b177fde797e6a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "experts" ADD CONSTRAINT "FK_2728a584942d4f9668413831953" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "experts" DROP CONSTRAINT "FK_2728a584942d4f9668413831953"`,
    );
    await queryRunner.query(`DROP TABLE "experts"`);
  }
}
