import z from "zod";
import { emailSchema, fullNameSchema, passwordSchema, roleSchema } from "../../validaters/schemas.validaters";


export const signupSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  role: roleSchema,
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupRequestDto = z.infer<typeof signupSchema>;