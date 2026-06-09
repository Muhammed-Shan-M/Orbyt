import {  Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../constands/httpStatus";
import { ERROR_MESSAGES } from "../constands/error-message.constands";
import logger from "../logger/logger";


export const globalErrorHandler = (err: Error, req: Request, res: Response) => {
    let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR
    let message = ERROR_MESSAGES.GENERAL.SERVER_ERROR
    logger.error(err)

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    }
    else if (err instanceof ZodError) {
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
        code: err instanceof AppError && err.code ? err.code : undefined,
    })
}