import { transporter } from "../transporter/nodemailer.transporter";
import { IEmailService } from "../interfaces/email-service.interface";
import { SendEmailOptions } from "../types/email.types";
import { ENV } from "../../../../config/env"; 

export class NodemailerEmailService implements IEmailService {

  async sendEmail({
    to,
    subject,
    html,
  }: SendEmailOptions): Promise<void> {

    await transporter.sendMail({
      from: `"Orbyt" <${ENV.APP_EMAIL}>`,
      to,
      subject,
      html,
    });

  }
}