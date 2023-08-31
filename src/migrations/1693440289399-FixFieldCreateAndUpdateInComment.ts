import { MigrationInterface, QueryRunner } from "typeorm";

export class FixFieldCreateAndUpdateInComment1693440289399 implements MigrationInterface {
    name = 'FixFieldCreateAndUpdateInComment1693440289399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "publication_date"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "publication_date" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "update_date"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "update_date" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "update_date"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "update_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "publication_date"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "publication_date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
