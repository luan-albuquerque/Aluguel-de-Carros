import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1637198740756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "categories",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "VARCHAR", isUnique: true },
          { name: "description", type: "VARCHAR" },
          { name: "created_at", type: "TIMESTAMP", default: "now()" },
        ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
