import auth from "@config/auth";
import { iUsersTokensRepository } from "@modules/accounts/repositories/iUsersTokensRepository";
import { iDateProvider } from "@shared/container/providers/DateProvider/iDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface iPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenReposity: iUsersTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: iDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as iPayload;

    const user_id = sub;

    const userToken = await this.userTokenReposity.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!!");
    }

    await this.userTokenReposity.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token_days,
    });

    const expires_token_days = this.dateProvider.addDays(
      auth.expires_in_refresh_token_days
    );

    await this.userTokenReposity.create({
      expires_date: expires_token_days,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
