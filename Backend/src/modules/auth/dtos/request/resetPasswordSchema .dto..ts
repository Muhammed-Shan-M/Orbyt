import z from "zod";
import { emailSchema, passwordSchema } from "../../validaters/schemas.validaters";

export const resetPasswordSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type ResetPasswordRequestDto = z.infer<typeof resetPasswordSchema>;