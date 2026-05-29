import { SendEmailOptions } from "../types/email.types";

export interface IEmailService {
  sendEmail(options: SendEmailOptions): Promise<void>;
}