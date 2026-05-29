import  express,{Application}  from "express";
import { registerRoutes } from "./routes/founderRouter";
import { globalErrorHandler } from "./common/middleware/error.middleware"; 
import { AppError } from "./common/errors/AppError";
import cookieParser from "cookie-parser"
import { corsMiddleware } from "./config/cors";


const app:Application = express()

app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

registerRoutes(app)

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler)


export default app