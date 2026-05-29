"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const httpStatus_1 = require("../../../../common/constands/httpStatus");
const success_message_1 = require("../../../../common/constands/success-message");
const env_1 = require("../../../../config/env");
const sigup_validaters_1 = require("../../validaters/sigup.validaters");
const forgotSchema_vlidaters_1 = require("../../validaters/forgotSchema.vlidaters");
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    signup = async (req, res) => {
        const validatedData = sigup_validaters_1.signupSchema.parse(req.body);
        const user = await this.authService.signup(validatedData);
        console.log("send: ", user);
        res.status(httpStatus_1.HTTP_STATUS.OK).json({
            success: true,
            data: user,
        });
    };
    verifyEmail = async (req, res) => {
        const { token } = req.body;
        const response = await this.authService.verifyEmail(token);
        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: env_1.ENV.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(httpStatus_1.HTTP_STATUS.CREATED).json({
            success: true,
            message: success_message_1.SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED,
            accessToken: response.accessToken,
            user: response.user
        });
    };
    resendVerificationEmail = async (req, res) => {
        const { email } = req.body;
        await this.authService.resendVerificationEmail(email);
        res.status(httpStatus_1.HTTP_STATUS.OK).json({ success: true, message: success_message_1.SUCCESS_MESSAGES.AUTH.VERIFICATION_EMAIL_RESENT });
    };
    login = async (req, res) => {
        const { email, password } = req.body;
        const result = await this.authService.login(email, password);
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: env_1.ENV.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(httpStatus_1.HTTP_STATUS.OK).json({
            success: true,
            message: success_message_1.SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
            user: result.user,
            accessToken: result.accessToken
        });
    };
    refreshToken = async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        const result = await this.authService.refreshToken(refreshToken);
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: env_1.ENV.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(httpStatus_1.HTTP_STATUS.OK).json({
            success: true,
            message: "Refreshtoken created",
            accessToken: result.accessToken
        });
    };
    logout = async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: env_1.ENV.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(httpStatus_1.HTTP_STATUS.OK).json({
            success: true,
            message: success_message_1.SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS,
        });
    };
    forgotPassword = async (req, res) => {
        const vlaidateData = forgotSchema_vlidaters_1.forgotPasswordSchema.parse(req.body);
        await this.authService.forgotPassword(vlaidateData.email);
        return res.status(httpStatus_1.HTTP_STATUS.OK).json({
            success: true,
            message: success_message_1.SUCCESS_MESSAGES.AUTH.OTP_SEND
        });
    };
}
exports.AuthController = AuthController;
