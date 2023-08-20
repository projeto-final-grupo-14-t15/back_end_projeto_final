import { MigrationInterface, QueryRunner } from "typeorm";

export class IncludeSellerAndDeletedColumn1692553454620 implements MigrationInterface {
    name = 'IncludeSellerAndDeletedColumn1692553454620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isSeller" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isSeller"`);
    }

}
