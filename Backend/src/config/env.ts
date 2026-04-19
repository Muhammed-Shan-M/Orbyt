import dotenv from "dotenv"

dotenv.config()



export const ENV = {
    PORT : process.env.PORT || 50000,
    DB_URL: process.env.DB_URL as string
    
}