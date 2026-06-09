import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { ENV } from "../../config/env";
import { HTTP_STATUS } from "../constands/httpStatus";
import { AuthRepository } from "../../modules/auth/repositories/impliments/signup.repositery";
import { ERROR_MESSAGES } from "../constands/error-message.constands";
import { JwtPayload } from "../types/jwtPayload";
import { IAuthRepository } from "../../modules/auth/repositories/interfaces/signup.repositery.interface";
import logger from "../logger/logger";

const authRepository: IAuthRepository = new AuthRepository()


export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization



    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next(new AppError(ERROR_MESSAGES.AUTH.TOKEN_MISSING, HTTP_STATUS.UNAUTHORIZED))
    }

    const token = authHeader.split(' ')[1]

    let decoded: JwtPayload

    try {

        decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as JwtPayload

    } catch (error) {

        if (error instanceof jwt.TokenExpiredError) {

            return next(
                new AppError(
                    ERROR_MESSAGES.AUTH.TOKEN_EXPIRED,
                    HTTP_STATUS.UNAUTHORIZED,
                    'ACCESS_TOKEN_EXPIRED'
                )
            )

        }

        if (error instanceof jwt.JsonWebTokenError) {

            return next(
                new AppError(
                    ERROR_MESSAGES.AUTH.INVALID_TOKEN,
                    HTTP_STATUS.UNAUTHORIZED,
                    'INVALID_ACCESS_TOKEN'
                )
            )

        }

        return next(
            new AppError(
                ERROR_MESSAGES.AUTH.INVALID_TOKEN,
                HTTP_STATUS.UNAUTHORIZED
            )
        )

    }

    const user = await authRepository.findById(decoded.userId);


    if (!user) {
        return next(new AppError(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED))
    }

    if (user.isBlocked) {
        throw new AppError(ERROR_MESSAGES.AUTH.ACCOUNT_BLOCKED, HTTP_STATUS.FORBIDDEN);
    }

    req.user = {
        userId: decoded.userId,
        role: decoded.role
    }

    logger.info(`User ${user.email} authenticated successfully`)

    next()
}



