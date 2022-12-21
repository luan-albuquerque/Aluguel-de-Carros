import { iUserRepository } from "@modules/accounts/repositories/iUserRepository";
import { iUsersTokensRepository } from "@modules/accounts/repositories/iUsersTokensRepository";
import { iDateProvider } from "@shared/container/providers/DateProvider/iDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

interface iRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UserTokenRepository")
    private usersTokenRepository: iUsersTokensRepository,
    @inject("UserRepository")
    private userRepository: iUserRepository,
    @inject("DayJsDateProvider")
    private dateProvider: iDateProvider
  ) {}

  async execute({ token, password }: iRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired");
    }

    const user = await this.userRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.userRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
