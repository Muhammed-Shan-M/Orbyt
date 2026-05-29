import jwt from 'jsonwebtoken'
import { ENV } from '../../config/env'
import crypto from "crypto";

export const genarateAccessToken = (userId: string) => {
    return jwt.sign(
        {userId},
        ENV.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    )
}


export const genarateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};