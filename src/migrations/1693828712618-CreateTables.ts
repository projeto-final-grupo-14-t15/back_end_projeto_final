import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1693828712618 implements MigrationInterface {
    name = 'CreateTables1693828712618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "cep" character varying(15) NOT NULL, "state" character varying(55) NOT NULL, "city" character varying(55) NOT NULL, "street" character varying(55) NOT NULL, "complement" character varying(55) NOT NULL, "number" character varying(55) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_95c93a584de49f0b0e13f75363" UNIQUE ("userId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(155) NOT NULL, "password" character varying(255) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "isSeller" boolean NOT NULL DEFAULT false, "description" character varying(255) NOT NULL, "telephone" character varying(25) NOT NULL, "cpf" character varying(15) NOT NULL, "dateOfBirth" date NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "reset_password" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "link" character varying(255) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "announcement_id" integer, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying(255) NOT NULL, "publication_date" date NOT NULL DEFAULT now(), "update_date" date NOT NULL DEFAULT now(), "author_id" integer, "announcement_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcements" ("id" SERIAL NOT NULL, "brand" character varying(55) NOT NULL, "description" character varying(255) NOT NULL, "model" character varying(55) NOT NULL, "year" character varying(4) NOT NULL, "km" numeric NOT NULL, "fuel" character varying(55) NOT NULL, "color" character varying(55) NOT NULL, "higherThanFipe" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "price" numeric NOT NULL, "fipePrice" character varying(55) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_b3ad760876ff2e19d58e05dc8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_a8643abc834fa2e6346d9f64e40" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7b8075594dafaff1db5e89fd8e0" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_2e02da2019c7fcdbbd5d30b6816" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_2e02da2019c7fcdbbd5d30b6816"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7b8075594dafaff1db5e89fd8e0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_a8643abc834fa2e6346d9f64e40"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`DROP TABLE "announcements"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
