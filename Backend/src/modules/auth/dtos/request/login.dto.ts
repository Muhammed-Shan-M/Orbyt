import { z } from "zod";
import { emailSchema, passwordSchema } from '../../validaters/schemas.validaters';

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type LoginRequestDto = z.infer<typeof loginSchema>;