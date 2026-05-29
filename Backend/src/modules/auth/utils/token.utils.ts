import crypto from 'crypto'

const TOKEN_BYTE_LENGTH = 32;

export const genarateToken = (): string =>  {
    return crypto.randomBytes(TOKEN_BYTE_LENGTH).toString("hex");
}