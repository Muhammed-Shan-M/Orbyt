export const authRedisKeys = {
    forgotPasswordOtp: (userId: string) => `forgot-password:${userId}`,

    forgotPasswordCooldown: (userId: string) => `forgot-password-cooldown:${userId}`,
};