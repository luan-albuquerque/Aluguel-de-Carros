import { iCreateUserTokenDTO } from "../dtos/iCreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserToken";

interface iUsersTokensRepository {
  create({
    expires_date,
    user_id,
    refresh_token,
  }: iCreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(token: string): Promise<UserTokens>;
}

export { iUsersTokensRepository };
