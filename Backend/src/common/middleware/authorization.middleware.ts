import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constands/httpStatus";
import { ERROR_MESSAGES } from "../constands/error-message.constands";

export const requireRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        });
    }

    if (!roles.includes(req.user.role)) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
            message: ERROR_MESSAGES.AUTH.FORBIDDEN,
        });
    }

    next();
};