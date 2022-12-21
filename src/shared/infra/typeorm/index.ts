import { Connection, createConnection, getConnectionOptions } from "typeorm";

// por padrão o nome do host é o nome do serviço do docker
export default async (host = "db_ignite"): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOption, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_teste"
          : defaultOption.database,
    })
  );
};
