export interface SignupDTO {
  email: string;
  password: string;
  role: "founder" | "investor";
  fullName?: string;
}