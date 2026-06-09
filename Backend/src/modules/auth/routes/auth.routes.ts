import { Router } from "express";
import { AuthController } from "../controller/impliments/auth.controller";
import { ROUTES } from "../../../common/constands/routes";
import { asyncHandler } from "../../../common/utils/asynHandler";
import { AuthService } from "../services/impliments/auth.services";
import { AuthRepository } from "../repositories/impliments/signup.repositery";
import { RedisService } from "../../../common/services/redis/redis.service";
import { protect } from "../../../common/middleware/protect.middlewares";
import { NodemailerEmailService } from "../../../common/services/email/services/nodemailer-email.service";

const router = Router();

const authRepository = new AuthRepository()
const redisRepository = new RedisService()
const emailService = new NodemailerEmailService()
const authService = new AuthService(authRepository, redisRepository, emailService)
const authControler = new AuthController(authService)

router.post(ROUTES.AUTH.SIGNUP, asyncHandler(authControler.signup));
router.post(ROUTES.AUTH.VERIFY_EMAIL, asyncHandler(authControler.verifyEmail))
router.post(ROUTES.AUTH.RESEND_VERIFICATION_EMAIL, asyncHandler(authControler.resendVerificationEmail))

router.post(ROUTES.AUTH.LOGIN, asyncHandler(authControler.login))
router.post(ROUTES.AUTH.ADMIN_LOGIN, asyncHandler(authControler.adminLogin))


router.post(ROUTES.AUTH.REFRESHTOKEN, asyncHandler(authControler.refreshToken))


router.post(ROUTES.AUTH.LOGOUT, asyncHandler(authControler.logout))

router.get(ROUTES.AUTH.ME, asyncHandler(protect), asyncHandler(authControler.getMe))


router.post(ROUTES.AUTH.FORGOTPASSWORD, asyncHandler(authControler.forgotPassword))
router.post(ROUTES.AUTH.VERIFY_OTP, asyncHandler(authControler.verifyForgotPasswordOtp))
router.post(ROUTES.AUTH.RESET_PASSWORD, asyncHandler(authControler.resetPassword))
router.post(ROUTES.AUTH.RESEND_FORGOT_PASSWORD_OTP, asyncHandler(authControler.resendForgotPasswordOtp))
router.get(ROUTES.AUTH.FORGOTPASSWORD_COOLDOWN, asyncHandler(authControler.getForgotPasswordCooldown))




export default router;


