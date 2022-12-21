import { getRepository, Repository } from "typeorm";
import { iCreateUserDTO } from "@modules/accounts/dtos/iCreateUserDTO";
import { iUserRepository } from "@modules/accounts/repositories/iUserRepository";

import { User } from "../entities/User";

class UserRepository implements iUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id: user_id } });

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: iCreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
