import z from "zod";
import { emailSchema } from "../../validaters/schemas.validaters";

export const forgotPasswordCooldownSchema =
    z.object({
        email: emailSchema,
    });

export type ForgotPasswordCooldownRequestDto = z.infer<typeof forgotPasswordCooldownSchema>;