"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationEmailTemplate = void 0;
const verificationEmailTemplate = (fullName, verificationLink) => {
    return `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
    ">

      <h2 style="color: #333;">
        Welcome to Orbyt 🚀
      </h2>

      <p style="font-size: 16px; color: #555;">
        Hi ${fullName},
      </p>

      <p style="font-size: 16px; color: #555;">
        Thank you for signing up.
        Please verify your email address by clicking the button below.
      </p>

      <div style="margin: 30px 0;">
        <a
          href="${verificationLink}"
          style="
            background-color: #4f46e5;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
            font-weight: bold;
          "
        >
          Verify Email
        </a>
      </div>

      <p style="font-size: 14px; color: #777;">
        This link may expire after some time for security reasons.
      </p>

      <p style="font-size: 14px; color: #777;">
        If you did not create an account, you can safely ignore this email.
      </p>

      <hr style="margin: 30px 0;" />

      <p style="font-size: 13px; color: #999;">
        © ${new Date().getFullYear()} Orbyt. All rights reserved.
      </p>

    </div>
  `;
};
exports.verificationEmailTemplate = verificationEmailTemplate;
