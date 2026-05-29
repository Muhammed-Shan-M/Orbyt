"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerEmailService = void 0;
const nodemailer_transporter_1 = require("../transporter/nodemailer.transporter");
const env_1 = require("../../../../config/env");
class NodemailerEmailService {
    async sendEmail({ to, subject, html, }) {
        await nodemailer_transporter_1.transporter.sendMail({
            from: `"Orbyt" <${env_1.ENV.APP_EMAIL}>`,
            to,
            subject,
            html,
        });
    }
}
exports.NodemailerEmailService = NodemailerEmailService;
