import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { AppError } from "@shared/errors/AppError";
import { iUserRepository } from "@modules/accounts/repositories/iUserRepository";
import { iCreateUserDTO } from "@modules/accounts/dtos/iCreateUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private repository: iUserRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: iCreateUserDTO): Promise<void> {
    const userExists = await this.repository.findByEmail(email);

    if (userExists) {
      throw new AppError("User already exists", 400);
    }

    const passwordHash = await hash(password, 8);

    await this.repository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
