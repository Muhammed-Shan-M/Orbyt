import { z } from "zod";
import { emailSchema } from "../../validaters/schemas.validaters";

export const resendVerificationEmailSchema = z.object({
    email: emailSchema,
});

export type ResendVerificationEmailRequestDto = z.infer<typeof resendVerificationEmailSchema>;