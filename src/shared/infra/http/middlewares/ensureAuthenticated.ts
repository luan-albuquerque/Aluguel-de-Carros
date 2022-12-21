import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import auth from "@config/auth";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";

interface iPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization; // recebendo o token do header authorization

  // verificando se veio algum dado no header
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // separando o beader do token
  const [_, token] = authHeader.split(" ");

  try {
    //   Recebendo o sub do token (id de usuario)
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as iPayload;

    // instanciando o repositorio de usuarios
    const usersTokenRepository = new UsersTokenRepository();

    // buscando do usuario no banco
    const user = await usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    // Se usuario não exister, retornar erro
    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    // inserindo usuario na requisição
    request.user = {
      id: user.id,
    };

    // se exister, seguir aplicação
    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
