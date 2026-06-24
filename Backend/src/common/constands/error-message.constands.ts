

export const ERROR_MESSAGES = {
  AUTH: {
    USER_ALREADY_EXISTS: "User already exists",
    USER_NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid email or password",
    ACCOUNT_NOT_VERIFIED: "Please verify your email",
    ACCOUNT_BLOCKED: "Your account is blocked",
    VERIFICATION_ALREDY_SENT: "Verification already sent. Please check your email.",
    INVALID_TOKEN: "Invalid or expired token",
    TOKEN_EXPIRED: "Token expired",
    TOKEN_MISSING: "Access token missing",
    PLEASE_WAIT: "Please wait before requesting another OTP",
    ADMIN_ACCESS_REQUIRED: "Admin access required",
    INVALID_OTP: "Invalid or expired OTP.",
    TOO_MANY_ATTEMPTS: "Too many failed attempts. Please request a new OTP.",
    OTP_EXPIRED: "OTP expired",
    OTP_NOT_VERIFIED: 'OTP verification required',
    USER_CREATION_FAILED: "Unable to create user account.",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access denied",
  },

  VALIDATION: {
    REQUIRED_FIELDS: "Required fields are missing",
    INVALID_EMAIL: "Invalid email format",
    INVALID_NAME: "Invalid name format",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
    UPPERCASE_ERROR: "Must contain uppercase",
    LOWERCASE_ERROR: "Must contain lowercase",
    MUST_CONTAIN_NUMBER: "Must contain number",
  },


  ADMIN: {
    USER_NOT_FOUND: "User not found",
    USER_ID_INVALID: "Invalid user ID",
    USER_ALREADY_ACTIVE: "User is already active.",
    USER_ALREADY_BLOCKED: "User is already blocked.",
    ADMIN_CANNOT_BE_MODIFIED: "Admin accounts cannot be blocked or modified."
  },


  FOUNDER: {
    PROFILE_NOT_FOUND: "Founder profile not found.",
    PROFILE_ALREADY_EXISTS: "Founder profile already exists.",
    PROFILE_SAVE_FAILED: "Failed to save founder profile.",
    PROFILE_COMPLETION_REQUIRED: "Please complete your profile to continue.",
    PROFILE_ALREADY_COMPLETED: "Founder profile has already been completed.",

    STARTUP_NOT_FOUND: "Startup not found.",
    STARTUP_ALREADY_EXISTS: "Startup already exists.",
    STARTUP_SAVE_FAILED: "Failed to save startup information.",

    INVALID_STARTUP_STAGE: "Invalid startup stage selected.",
    INVALID_FUNDING_AMOUNT: "Invalid funding amount provided.",
    INVALID_EQUITY_PERCENTAGE: "Equity percentage must be between 0 and 100.",

    INVALID_STARTUP_NAME: "Please enter a valid startup name.",
    INVALID_INDUSTRY: "Please enter a valid industry.",

    INVALID_URL: "Please enter a valid URL.",
    INVALID_DESCRIPTION: "Please enter a valid description.",

    PITCH_DECK_REQUIRED: "Pitch deck is required.",
    PITCH_DECK_UPLOAD_FAILED: "Failed to upload pitch deck.",

    STARTUP_ACCESS_DENIED: "You do not have permission to access this startup.",
    PROFILE_ACCESS_DENIED: "You do not have permission to access this profile.",

    STARTUP_LIMIT_REACHED: "Startup creation limit reached.",

    FOUNDER_NOT_FOUND: "Founder not found.",
    FOUNDER_ACCOUNT_BLOCKED: "Your account has been blocked.",
    FOUNDER_ACCOUNT_NOT_APPROVED: "Your account is not approved.",

    PROFILE_INCOMPLETE: "Founder profile is incomplete.",
    STARTUP_INCOMPLETE: "Startup information is incomplete.",

    PROFILE_COMPLETION_PENDING: "Complete your founder profile before proceeding.",
    STARTUP_CREATION_REQUIRED: "Please create a startup before proceeding.",

    INVALID_PITCH_DECK_URL: "Invalid pitch deck URL.",
    INVALID_WEBSITE_URL: "Invalid website URL.",
    INVALID_LINKEDIN_URL: "Invalid LinkedIn URL.",
  },


  GENERAL: {
    SERVER_ERROR: "Internal Server Error",
    UNAUTHORIZED: "Unauthorized access",
  },
};