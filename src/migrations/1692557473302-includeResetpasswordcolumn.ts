import { MigrationInterface, QueryRunner } from "typeorm";

export class IncludeResetpasswordcolumn1692557473302 implements MigrationInterface {
    name = 'IncludeResetpasswordcolumn1692557473302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password"`);
    }

}
