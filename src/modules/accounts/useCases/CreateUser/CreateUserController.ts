import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, email, password, driver_license } = request.body;

    try {
      await createUserUseCase.execute({
        name,
        email,
        password,
        driver_license,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ Error: error.message });
    }
  }
}

export { CreateUserController };
