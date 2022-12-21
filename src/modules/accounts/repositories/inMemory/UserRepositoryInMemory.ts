import { iCreateUserDTO } from "@modules/accounts/dtos/iCreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { iUserRepository } from "../iUserRepository";

class UserRepositoryInMemory implements iUserRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    driver_license,
  }: iCreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
      created_at: new Date(),
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  async findById(user_id: string): Promise<User> {
    const user = this.users.find((user) => user.id === user_id);

    return user;
  }
}

export { UserRepositoryInMemory };
