export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'founder' | "investor"
}