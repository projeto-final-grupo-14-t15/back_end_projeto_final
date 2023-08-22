import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAnnouncements1692734307877 implements MigrationInterface {
    name = 'FixAnnouncements1692734307877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "fipePrice"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "fipePrice" character varying(55) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "fipePrice"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "fipePrice" numeric NOT NULL DEFAULT '1'`);
    }

}
