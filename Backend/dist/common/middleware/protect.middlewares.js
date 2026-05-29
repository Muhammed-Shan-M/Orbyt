"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../errors/AppError");
const env_1 = require("../../config/env");
const httpStatus_1 = require("../constands/httpStatus");
const signup_repositery_1 = require("../../modules/auth/repositories/impliments/signup.repositery");
const error_message_constands_1 = require("../constands/error-message.constands");
const authRepository = new signup_repositery_1.AuthRepository();
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next(new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.TOKEN_MISSING, httpStatus_1.HTTP_STATUS.UNAUTHORIZED));
    }
    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.ACCESS_TOKEN_SECRET);
    }
    catch (error) {
        return next(new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.INVALID_TOKEN, httpStatus_1.HTTP_STATUS.UNAUTHORIZED));
    }
    const user = await authRepository.findById(decoded.userId);
    console.log(decoded);
    if (!user) {
        return next(new AppError_1.AppError(error_message_constands_1.ERROR_MESSAGES.AUTH.USER_NOT_FOUND, httpStatus_1.HTTP_STATUS.UNAUTHORIZED));
    }
    req.user = user;
    console.log(req.user);
    next();
};
exports.protect = protect;
