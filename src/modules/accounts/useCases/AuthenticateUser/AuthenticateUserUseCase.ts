import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { iUserRepository } from "@modules/accounts/repositories/iUserRepository";
import { iUsersTokensRepository } from "@modules/accounts/repositories/iUsersTokensRepository";
import auth from "@config/auth";
import { iDateProvider } from "@shared/container/providers/DateProvider/iDateProvider";

interface iRequest {
  email: string;
  password: string;
}

interface iResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private repository: iUserRepository,
    @inject("UserTokenRepository")
    private tokenRepository: iUsersTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: iDateProvider
  ) {}

  async execute({ email, password }: iRequest): Promise<iResponse> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      // Classe AppError para controle de erros
      // Recebe uma mensagem e um statusCode
      throw new AppError("Email or Password incorrect!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or Password incorrect!", 401);
    }

    const token = sign(
      { name: user.name, email: user.email },
      auth.secret_token,
      {
        expiresIn: auth.expires_in_token,
        subject: user.id,
      }
    );

    const refresh_token = sign(
      { email: user.email },
      auth.secret_refresh_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_refresh_token,
      }
    );

    const expires_date_refresh = this.dateProvider.addDays(
      auth.expires_in_refresh_token_days
    );

    await this.tokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: expires_date_refresh,
    });

    const userResponse: iResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return userResponse;
  }
}

export { AuthenticateUserUseCase };
