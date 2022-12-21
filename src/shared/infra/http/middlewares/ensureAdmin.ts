import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // recebi o id do usuário do request do middleware de autenticação
  const { id } = request.user;

  // instanciei o repositório de usuários
  const userRepository = new UserRepository();

  // verifiquei se o usuário existe
  const { admin } = await userRepository.findById(id);

  // validei se é administrador ou não... se não for, acontece uma exceção
  if (!admin) {
    throw new AppError("User isn't admin!");
  }

  // se for, continua na rota
  next();
}

export { ensureAdmin };
