export const ROUTES = {
  AUTH: {
    BASE: "/api/auth",
    SIGNUP: "/signup",
    LOGIN: "/login",
    ADMIN_LOGIN: "/admin/login",
    LOGOUT: "/logout",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_EMAIL: "/verify-email",
    RESEND_VERIFICATION_EMAIL: "/resend-verification_link",
    REFRESHTOKEN: "/refresh-token",

    FORGOTPASSWORD: "/forgot-password",
    VERIFY_OTP: "/forgot-password/verify-otp",
    RESEND_FORGOT_PASSWORD_OTP: "/forgot-password/resend-otp",
    FORGOTPASSWORD_COOLDOWN: "/forgot-password-cooldown",

    ME: "/me",
  },

  ADMIN: {
    BASE: "/api/admin",
    DASHBOARD: "/dashboard",
    USERS: "/users",
    USER: "/user/:userId",
    BLOCK_USER: "/user/:userId/block",
    UNBLOCK_USER: "/user/:userId/unblock"
  },

  USER: {
    PROFILE: "/profile",
    COMPLETE_PROFILE: "/complete",
  },
} as const