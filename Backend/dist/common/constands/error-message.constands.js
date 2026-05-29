"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = void 0;
exports.ERROR_MESSAGES = {
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
        PLEASE_WAIT: "Please wait before requesting another OTP"
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
    GENERAL: {
        SERVER_ERROR: "Internal Server Error",
        UNAUTHORIZED: "Unauthorized access",
    },
};
