import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { email, password } = request.body;

    try {
      const authenticateInfo = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json(authenticateInfo);
    } catch (error) {
      return response.status(400).json({ Error: error.message });
    }
  }
}

export { AuthenticateUserController };
