import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, admin, driver_license, created_at)
        values('${id}', 'admin', 'admin@rentx.com.br','${password}', true, '999999', 'now()')
        `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
