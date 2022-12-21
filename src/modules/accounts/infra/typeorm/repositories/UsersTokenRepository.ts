import { iCreateUserTokenDTO } from "@modules/accounts/dtos/iCreateUserTokenDTO";
import { iUsersTokensRepository } from "@modules/accounts/repositories/iUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserToken";

class UsersTokenRepository implements iUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: iCreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await this.repository.create({
      expires_date,
      user_id,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return await this.repository.findOne({ where: { user_id, refresh_token } });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    return await this.repository.findOne({ where: { refresh_token: token } });
  }
}

export { UsersTokenRepository };
