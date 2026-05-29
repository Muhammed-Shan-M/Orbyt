"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = require("../errors/AppError");
const zod_1 = require("zod");
const httpStatus_1 = require("../constands/httpStatus");
const error_message_constands_1 = require("../constands/error-message.constands");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = error_message_constands_1.ERROR_MESSAGES.GENERAL.SERVER_ERROR;
    console.log(err);
    if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        return res.status(statusCode).json({
            success: false,
            message: "Validation failed",
            errors: err.issues.map((e) => ({
                field: e.path[0],
                message: e.message,
            })),
        });
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.globalErrorHandler = globalErrorHandler;
