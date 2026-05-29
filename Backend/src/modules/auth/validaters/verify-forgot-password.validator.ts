import { z } from 'zod'

export const verifyForgotPasswordOtpSchema =
    z.object({
        email: z
            .string()
            .trim()
            .email('Invalid email'),

        otp: z
            .string()
            .trim()
            .length(6, 'OTP must be 6 digits')
            .regex(
                /^\d+$/,
                'OTP must contain only numbers'
            ),
    })

export type VerifyForgotPasswordOtpInput = z.infer<typeof verifyForgotPasswordOtpSchema>