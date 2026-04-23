import { Router } from "express";
import { AuthController } from "../controller/impliments/auth.controller";
import { ROUTES } from "../../../common/constands/routes";
import { asyncHandler } from "../../../common/utils/asynHandler";
import { AuthService } from "../services/auth.services";
import { AuthRepository } from "../repositories/impliments/signup.repositery";

const router = Router();

const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const authControler = new AuthController(authService)

router.post(ROUTES.AUTH.SIGNUP,asyncHandler(authControler.signup));

export default router;