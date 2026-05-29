"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genarateRefreshToken = exports.genarateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const crypto_1 = __importDefault(require("crypto"));
const genarateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, env_1.ENV.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
exports.genarateAccessToken = genarateAccessToken;
// export const genarateRefreshToken = (userId: string) => {
//     return jwt.sign(
//         {userId},
//         ENV.REFRESH_TOKEN_SECRET,
//         {expiresIn: "7d"}
//     )
// }
const genarateRefreshToken = () => {
    return crypto_1.default.randomBytes(40).toString("hex");
};
exports.genarateRefreshToken = genarateRefreshToken;
