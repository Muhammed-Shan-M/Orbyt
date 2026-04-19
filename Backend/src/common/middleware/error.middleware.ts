import { Request,Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500
    let message = "Internal Server Error"

    if(err instanceof AppError){
        statusCode = err.statusCode
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
    })
}