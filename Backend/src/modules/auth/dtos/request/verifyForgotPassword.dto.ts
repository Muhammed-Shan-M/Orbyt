import z from "zod";
import { emailSchema } from "../../validaters/schemas.validaters";

export const verifyForgotPasswordOtpSchema =
    z.object({
        email: emailSchema,
        otp: z
            .string()
            .trim()
            .length(6, 'OTP must be 6 digits')
            .regex(
                /^\d+$/,
                'OTP must contain only numbers'
            ),
    });

export type VerifyForgotPasswordOtpRequestDto = z.infer<typeof verifyForgotPasswordOtpSchema>;