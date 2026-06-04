

export const ROUTES = {
  PUBLIC: {
    LANDING: "/",
  },

  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    VERIFY_EMAIL: "/verify-email/:token",
    LOGOUT: "/logout",

    FORGOT_PASSWORD: "/forgot-password",
    FORGOT_PASSWORD_VERIFY: "/forgot-password/verify",
    FORGOT_PASSWORD_RESET: "/forgot-password/reset",
    FORGOT_PASSWORD_SUCCESS: "/forgot-password/success",
  },

  FOUNDER: {
    DASHBOARD: '/founder/dashboard',
  },

  INVESTOR: {
    DASHBOARD: '/investor/dashboard',
  },

  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
  },
} as const;