import cors from "cors";
import { ENV } from "./env";

export const corsMiddleware = cors({
  origin: ENV.FRONTEND_URL,
  credentials: true,
});