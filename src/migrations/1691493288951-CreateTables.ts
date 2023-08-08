import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1691493288951 implements MigrationInterface {
    name = 'CreateTables1691493288951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "cep" character varying(15) NOT NULL, "state" character varying(55) NOT NULL, "city" character varying(55) NOT NULL, "street" character varying(55) NOT NULL, "complement" character varying(55) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(155) NOT NULL, "password" character varying(255) NOT NULL, "accountType" boolean NOT NULL DEFAULT false, "description" character varying(255) NOT NULL, "telephone" character varying(25) NOT NULL, "cpf" character varying(15) NOT NULL, "date_of_birth" date NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "addressId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "link" character varying(255) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "announcement_id" integer, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcements" ("id" SERIAL NOT NULL, "brand" character varying(55) NOT NULL, "description" character varying(255) NOT NULL, "model" character varying(55) NOT NULL, "year" character varying(4) NOT NULL, "km" character varying(55) NOT NULL, "fuel" character varying(55) NOT NULL, "color" character varying(55) NOT NULL, "higher_than_fipe" boolean NOT NULL, "price" character varying(55) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_b3ad760876ff2e19d58e05dc8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_a8643abc834fa2e6346d9f64e40" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_2e02da2019c7fcdbbd5d30b6816" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_2e02da2019c7fcdbbd5d30b6816"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_a8643abc834fa2e6346d9f64e40"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`DROP TABLE "announcements"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
