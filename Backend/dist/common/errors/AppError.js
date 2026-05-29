"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statuscode) {
        super(message);
        this.statusCode = statuscode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
