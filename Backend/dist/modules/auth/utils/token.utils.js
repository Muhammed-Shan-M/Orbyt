"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genarateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const TOKEN_BYTE_LENGTH = 32;
const genarateToken = () => {
    return crypto_1.default.randomBytes(TOKEN_BYTE_LENGTH).toString("hex");
};
exports.genarateToken = genarateToken;
