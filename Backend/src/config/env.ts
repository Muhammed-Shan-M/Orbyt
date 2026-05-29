import dotenv from "dotenv"

dotenv.config()



export const ENV = {
    PORT : process.env.PORT || 50000,
    DB_URL: process.env.DB_URL as string,
    REDIS_URL: process.env.REDIS_URL,

    APP_EMAIL: process.env.APP_EMAIL,
    APP_EMAIL_PASS:process.env.APP_EMAIL_PASS,

    BASE_URL:process.env.BASE_URL,
    FRONTEND_URL:process.env.FRONTEND_URL,

    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PORT:process.env.REDIS_PORT,

    NODE_ENV:process.env.NODE_ENV,

    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET as string,
}