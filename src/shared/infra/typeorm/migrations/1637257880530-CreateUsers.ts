import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1637257880530 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "VARCHAR" },
          { name: "username", type: "VARCHAR", isUnique: true },
          { name: "password", type: "VARCHAR" },
          { name: "email", type: "VARCHAR", isUnique: true },
          { name: "driver_license", type: "VARCHAR" },
          { name: "admin", type: "boolean", default: false },
          { name: "created_at", type: "TIMESTAMP", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
