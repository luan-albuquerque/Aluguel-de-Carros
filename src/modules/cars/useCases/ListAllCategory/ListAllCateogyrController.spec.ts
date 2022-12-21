import request from "supertest";
import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

let connection: Connection;

describe("List all categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations(); // rodar as migrations no banco de teste

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, admin, driver_license, created_at)
            values('${id}', 'admin', 'admin@rentx.com.br','${password}', true, '999999', 'now()')
            `
    );

    // logando com o usuário
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@rentx.com.br", password: "admin" });

    const token = responseToken.body.token;

    await request(app)
      .post("/categories")
      .send({
        name: "name category Supertest",
        description: "description category Supertest",
      }) // Seta os dados enviados
      .set({
        Authorization: `Bearer ${token}`,
      }); // Seta a autorização para o usuário
  });

  // apaga o banco e fecha a conexão depois de tudo
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able list all categories", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("name category Supertest");
    expect(response.body[0].description).toEqual(
      "description category Supertest"
    );
  });
});

// describe("Tirar depois", () => {
//   it("tirar", () => {
//     expect(1).toBe(1);
//   });
// });
