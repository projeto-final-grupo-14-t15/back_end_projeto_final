import { MigrationInterface, QueryRunner } from "typeorm";

export class Convert1691698609977 implements MigrationInterface {
    name = 'Convert1691698609977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "km"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "km" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "price" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "km"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "km" character varying(6) NOT NULL`);
    }

}
