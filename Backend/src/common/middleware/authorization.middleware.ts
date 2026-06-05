import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constands/httpStatus";
import { ERROR_MESSAGES } from "../constands/error-message.constands";
import { AppError } from "../errors/AppError";

export const requireRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    console.log("Checking roles:", roles, "User role:", req.user?.role);

    if (!req.user) {
        throw new AppError(ERROR_MESSAGES.AUTH.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED,);
    }

    if (!roles.includes(req.user.role)) {
        throw new AppError(ERROR_MESSAGES.AUTH.FORBIDDEN, HTTP_STATUS.FORBIDDEN,);
    }

    next();
};