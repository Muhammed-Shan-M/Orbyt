import  express,{Application}  from "express";
import { registerRoutes } from "./routes/auth.router";
import { globalErrorHandler } from "./common/middleware/error.middleware"; 
import { AppError } from "./common/errors/AppError";
import cookieParser from "cookie-parser"
import { corsMiddleware } from "./config/cors";
import { registerAdminRoutes } from "./routes/admin.router";
import { morganMiddleware } from "./common/middleware/morgen.middleware";


const app:Application = express()

app.use(corsMiddleware)
app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

registerRoutes(app)
registerAdminRoutes(app)

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler)


export default app