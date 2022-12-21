import { AppError } from "@shared/errors/AppError";
import { iCreateUserDTO } from "@modules/accounts/dtos/iCreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createdUseCase: CreateUserUseCase;
let authenticateUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;

describe("Authenticate user", () => {
  // instancia de dados antes do teste
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    createdUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  // teste que verifica a criação do token
  it("shoud be able to authenticate an user", async () => {
    const user: iCreateUserDTO = {
      driver_license: "000123",
      name: "test",
      email: "user@test.com",
      password: "1234",
    };

    await createdUseCase.execute(user);

    const result = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("shoud not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUseCase.execute({
        email: "false@teste.com",
        password: "123465",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able to authenticate an password invalid", () => {
    expect(async () => {
      const user: iCreateUserDTO = {
        driver_license: "000123",
        name: "test",
        email: "user@test.com",
        password: "1234",
      };

      await createdUseCase.execute(user);

      await authenticateUseCase.execute({
        email: user.email,
        password: "453154",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
