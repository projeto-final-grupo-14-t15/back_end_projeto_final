import { MigrationInterface, QueryRunner } from "typeorm";

export class FixFieldTextInComment1693415753228 implements MigrationInterface {
    name = 'FixFieldTextInComment1693415753228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "text" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "text" character varying NOT NULL`);
    }

}
