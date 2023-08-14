import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692023157728 implements MigrationInterface {
    name = 'InitialMigration1692023157728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "updated_at" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "updatedAt" TO "updated_at"`);
    }

}
