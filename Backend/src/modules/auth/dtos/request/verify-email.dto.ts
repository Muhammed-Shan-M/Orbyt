import { z } from "zod";

export const verifyEmailSchema = z.object({
    token: z.string().min(1),
});

export type VerifyEmailRequestDto = z.infer<typeof verifyEmailSchema>;