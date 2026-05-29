export interface OtpData {
  hashedOtp: string;
  attempts: number;
  verified: boolean;
}