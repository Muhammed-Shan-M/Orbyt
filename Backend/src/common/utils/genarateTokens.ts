import jwt from 'jsonwebtoken'
import { ENV } from '../../config/env'
import crypto from "crypto";
import { UserRole } from '../../modules/auth/types/user.types';


export const genarateAccessToken = (userId: string, role: UserRole) => {
    return jwt.sign(
        {userId, role},
        ENV.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    )
}


export const genarateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};