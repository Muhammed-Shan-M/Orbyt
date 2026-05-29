export interface FormState {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  role: Role
}

export type Role = 'founder' | 'investor'