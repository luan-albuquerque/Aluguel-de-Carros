import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { iMailProvider } from "../iMailProvider";

class EtherealMailProvider implements iMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transport = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transport;
      })
      .catch((e) => console.error(e));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br",
      subject,
      html: templateHTML,
    });
    console.log("Message sent: ", message.messageId);
    console.log("Preview URL: ", message.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
