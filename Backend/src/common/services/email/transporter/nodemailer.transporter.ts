import nodemailer from "nodemailer";
import { ENV } from "../../../../config/env";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.APP_EMAIL,
    pass: ENV.APP_EMAIL_PASS,
  },
});