import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"; // lib para identificação de exceções (throw new ...) nas rotas
import "../../container";
import createConnection from "@shared/infra/typeorm";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../../../swagger.json";
import { routes } from "@shared/infra/http/routes";
import { AppError } from "@shared/errors/AppError";

createConnection(); // banco

const app = express();

app.use(express.json());

// Rota do swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(routes);

// Middleware de controle derros
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // Se error for um AppError
    if (err instanceof AppError) {
      // retorna as instancias inicializadas na classe AppError
      return response.status(err.statusCode).json({ message: err.message });
    }

    // retorna um erro de server não detectado
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
