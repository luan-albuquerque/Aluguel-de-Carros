import { iUserRepository } from "@modules/accounts/repositories/iUserRepository";
import { iUsersTokensRepository } from "@modules/accounts/repositories/iUsersTokensRepository";
import { iDateProvider } from "@shared/container/providers/DateProvider/iDateProvider";
import { iMailProvider } from "@shared/container/providers/MailProvider/iMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";
import { resolve } from "path";

@injectable()
class SendForgotPasswordUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: iUserRepository,
    @inject("UserTokenRepository")
    private usersTokenRepository: iUsersTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: iDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: iMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists", 404);
    }

    const token = uuid();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath);
  }
}
export { SendForgotPasswordUseCase };
