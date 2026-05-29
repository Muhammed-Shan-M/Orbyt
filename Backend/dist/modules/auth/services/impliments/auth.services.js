"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const argon2_1 = __importDefault(require("argon2"));
const AppError_1 = require("../../../../common/errors/AppError");
const error_message_constands_1 = require("../../../../common/constands/error-message.constands");
const httpStatus_1 = require("../../../../common/constands/httpStatus");
const token_utils_1 = require("../../utils/token.utils");
const success_message_1 = require("../../../../common/constands/success-message");
// import { sendVerificationEmail } from "../../utils/email.utils";
const env_1 = require("../../../../config/env");
const genarateTokens_1 = require("../../../../common/utils/genarateTokens");
const redis_utils_1 = require("../../utils/redis.utils");
const verification_email_template_ts_1 = require("../../../../common/services/email/templates/verification-email.template.ts");
const otp_utils_1 = require("../../utils/otp.utils");
const hash_utils_1 = require("../../utils/hash.utils");
const forgot_password_otp_template_1 = require("../../../../common/services/email/templates/forgot-password-otp.template");
class AuthService {
    authRepo;
    redisService;
    emailService;
    constructor(authRepo, redisService, emailService) {
        this.authRepo = authRepo;
        this.redisService = redisService;
        this.emailService = emailService;
    }
    async signup(data) {
        const existingUser = await this.authRepo.findByEmail(data.email);
        if (existingUser) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.USER_ALREADY_EXISTS, httpStatus_1.HTTP_STATUS.BAD_REQUEST);
        }
        const existing = await this.redisService.get(`verify:${data.email}`);
        if (existing) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.VERIFICATION_ALREDY_SENT, httpStatus_1.HTTP_STATUS.BAD_REQUEST);
        }
        const hashedPassword = await argon2_1.default.hash(data.password);
        const token = (0, token_utils_1.genarateToken)();
        await this.redisService.set(`verify:${data.email}`, {
            email: data.email,
            password: hashedPassword,
            fullName: data.fullName || "",
            role: data.role,
            token: token
        }, 600);
        await this.redisService.set(`verify:${token}`, data.email, 600);
        const link = `${env_1.ENV.FRONTEND_URL}/verify-email/${token}`;
        const html = (0, verification_email_template_ts_1.verificationEmailTemplate)(data.fullName, link);
        await this.emailService.sendEmail({
            to: data.email,
            subject: "Verify Your Email",
            html,
        });
        return {
            success: true,
            message: success_message_1.SUCCESS_MESSAGES.AUTH.VERIFICATION_EAMIL_SENT
        };
    }
    async verifyEmail(token) {
        const userEmail = (await this.redisService.get(`verify:${token}`));
        if (!userEmail) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.INVALID_TOKEN, httpStatus_1.HTTP_STATUS.UNAUTHORIZED);
        }
        const userData = await this.redisService.get(`verify:${userEmail}`);
        if (!userData) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.INVALID_TOKEN, httpStatus_1.HTTP_STATUS.UNAUTHORIZED);
        }
        const existingUser = await this.authRepo.findByEmail(userData.email);
        if (existingUser) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.USER_ALREADY_EXISTS, httpStatus_1.HTTP_STATUS.CONFLICT);
        }
        const user = await this.authRepo.createUser({
            ...userData,
            isEmailVerified: true
        });
        const accessToken = (0, genarateTokens_1.genarateAccessToken)(user._id.toString());
        const refreshToken = (0, genarateTokens_1.genarateRefreshToken)();
        await this.redisService.del(`verify:${userEmail}`);
        await this.redisService.del(`verify:${token}`);
        await (0, redis_utils_1.storeRefreshToken)(refreshToken, user._id.toString());
        return {
            user,
            accessToken,
            refreshToken
        };
    }
    async resendVerificationEmail(email) {
        const redisData = await this.redisService.get(`verify:${email}`);
        if (!redisData || !redisData.token) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.INVALID_TOKEN, httpStatus_1.HTTP_STATUS.UNAUTHORIZED);
        }
        await this.redisService.del(redisData.token);
        const newToken = (0, token_utils_1.genarateToken)();
        redisData.token = newToken;
        await this.redisService.set(`verify:${email}`, redisData, 600);
        await this.redisService.set(`verify:${newToken}`, email, 600);
        const link = `${env_1.ENV.FRONTEND_URL}/verify-email/${newToken}`;
        const html = (0, verification_email_template_ts_1.verificationEmailTemplate)(redisData.fullName, link);
        await this.emailService.sendEmail({
            to: email,
            subject: "Verify Your Email",
            html,
        });
        return true;
    }
    async login(email, password) {
        const user = await this.authRepo.findByEmail(email);
        if (!user) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, httpStatus_1.HTTP_STATUS.UNAUTHORIZED);
        }
        if (!user.isEmailVerified) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.ACCOUNT_NOT_VERIFIED, httpStatus_1.HTTP_STATUS.FORBIDDEN);
        }
        const isMatch = await argon2_1.default.verify(user.password, password);
        if (!isMatch) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, httpStatus_1.HTTP_STATUS.UNAUTHORIZED);
        }
        const accessToken = (0, genarateTokens_1.genarateAccessToken)(user._id.toString());
        const refreshToken = (0, genarateTokens_1.genarateRefreshToken)();
        await (0, redis_utils_1.storeRefreshToken)(refreshToken, user._id.toString());
        return {
            user,
            accessToken,
            refreshToken
        };
    }
    async refreshToken(token) {
        if (!token) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.INVALID_TOKEN, httpStatus_1.HTTP_STATUS.UNAUTHORIZED);
        }
        const userId = await (0, redis_utils_1.getRefreshToken)(token);
        if (!userId) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.INVALID_TOKEN, httpStatus_1.HTTP_STATUS.UNAUTHORIZED);
        }
        await (0, redis_utils_1.deleteRefreshToken)(token);
        const accessToken = (0, genarateTokens_1.genarateAccessToken)(userId);
        const newRefreshToken = (0, genarateTokens_1.genarateRefreshToken)();
        await (0, redis_utils_1.storeRefreshToken)(newRefreshToken, userId);
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
    async logout(token) {
        if (!token) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.TOKEN_MISSING, httpStatus_1.HTTP_STATUS.UNAUTHORIZED);
        }
        await (0, redis_utils_1.deleteRefreshToken)(token);
        return {
            message: success_message_1.SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
        };
    }
    async forgotPassword(email) {
        const user = await this.authRepo.findByEmail(email);
        if (!user) {
            return;
        }
        const cooldownKey = `forgot-password-cooldown:${user?._id}`;
        const cooldownExists = await this.redisService.get(cooldownKey);
        if (cooldownExists) {
            throw new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.PLEASE_WAIT, httpStatus_1.HTTP_STATUS.TOO_MANY_REQUESTS);
        }
        const otp = (0, otp_utils_1.generateOtp)();
        const hashedOtp = (0, hash_utils_1.hashValue)(otp);
        const redisKey = `forgot-password:${user._id}`;
        await this.redisService.set(redisKey, {
            hashedOtp,
            attempts: 0,
            verified: false,
        }, 300);
        await this.redisService.set(cooldownKey, true, 60);
        const html = (0, forgot_password_otp_template_1.forgotPasswordOtpTemplate)(otp);
        await this.emailService.sendEmail({
            to: user.email,
            subject: "Password Reset OTP",
            html,
        });
    }
}
exports.AuthService = AuthService;
