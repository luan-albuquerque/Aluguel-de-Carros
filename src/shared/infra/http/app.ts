import "reflect-metadata";
import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"; // lib para identificação de exceções (throw new ...) nas rotas
import "../../container";
import createConnection from "@shared/infra/typeorm";
import raterLimiter from "@shared/infra/http/middlewares/raterLimiter"
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../../../swagger.json";
import { routes } from "@shared/infra/http/routes";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";

createConnection(); // banco

const app = express();
app.use(raterLimiter)

app.use(express.json());

// Rota do swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

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
