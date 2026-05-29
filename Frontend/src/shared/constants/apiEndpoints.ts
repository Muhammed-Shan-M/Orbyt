

export const API_ENDPOINTS = {
  auth: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",

    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/forgot-password/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    RESEND_FORGOT_PASSWORD_OTP: "/auth/forgot-password/resend-otp",
    FORGOTPASSWORD_COOLDOWN: "/auth/forgot-password-cooldown",

    REFRESH_TOKEN: '/auth/refresh-token',
    ME: '/auth/me',
  },


  
} as const;