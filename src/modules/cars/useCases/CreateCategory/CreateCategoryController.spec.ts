import request from "supertest";
import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

let connection: Connection;

// separar o app do servidor que vai rodar
describe("Create Category Controller", () => {
  // Cria a conexão antes de tudo
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
  });

  // apaga o banco e fecha a conexão depois de tudo
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Shoud be able to create a new category", async () => {
    // logando com o usuário
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@rentx.com.br", password: "admin" });

    const token = responseToken.body.token;

    // função send para enviar os dados no request
    // retorna um response para o test
    const response = await request(app)
      .post("/categories")
      .send({
        name: "name category Supertest",
        description: "description category Supertest",
      }) // Seta os dados enviados
      .set({
        Authorization: `Bearer ${token}`,
      }); // Seta a autorização para o usuário

    expect(response.status).toBe(201);
  });

  it("Shoud be able to create a new category with same name", async () => {
    // logando com o usuário
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@rentx.com.br", password: "admin" });

    const token = responseToken.body.token;

    // função send para enviar os dados no request
    // retorna um response para o test
    const response = await request(app)
      .post("/categories")
      .send({
        name: "name category Supertest",
        description: "description category Supertest",
      }) // Seta os dados enviados
      .set({
        Authorization: `Bearer ${token}`,
      }); // Seta a autorização para o usuário

    expect(response.status).toBe(400);
  });
});

// describe("Tirar depois", () => {
//   it("tirar", () => {
//     expect(1).toBe(1);
//   });
// });
