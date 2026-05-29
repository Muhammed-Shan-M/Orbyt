export const forgotPasswordOtpTemplate = (otp: string) => {
  return `
    <h2>Password Reset OTP</h2>

    <p>Your OTP is:</p>

    <h1>${otp}</h1>

    <p>This OTP expires in 10 minutes.</p>
  `;
};