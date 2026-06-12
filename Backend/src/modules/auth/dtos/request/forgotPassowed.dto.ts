import z from "zod";
import { emailSchema } from "../../validaters/schemas.validaters";

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export type ForgotPasswordRequestDto =  z.infer<typeof forgotPasswordSchema>;