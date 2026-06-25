import { Router } from "express";
import { ProfileCompletionController } from "../controller/impliments/profile-completion.controller";
import { FounderMapper } from "../mappers/founder.mapper";
import { FounderRepository } from "../repositories/impliments/founder.repository";
import { ProfileCompletionService } from "../services/impliments/profile-completion.service";
import { asyncHandler } from "../../../common/utils/asynHandler";
import { protect } from "../../../common/middleware/protect.middlewares";
import { ROUTES } from "../../../common/constands/routes";
import { requireRole } from "../../../common/middleware/authorization.middleware";
import { StartupRepository } from "../repositories/impliments/startup.repository";
import { StartupMapper } from "../mappers/startup.mapper";
import { UserRepository } from "../../auth/repositories/impliments/user.repositery";

const router = Router()

const founderRepository = new FounderRepository();
const startupRepository = new StartupRepository()
const userRepository = new UserRepository()

const founderMapper = new FounderMapper();
const startupMapper = new StartupMapper()


const profileCompletionService = new ProfileCompletionService(
    founderRepository,
    startupRepository,
    founderMapper,
    startupMapper,
    userRepository
);

const profileCompletionController = new ProfileCompletionController(profileCompletionService);



router.post(ROUTES.FOUNDER.COMPLETE_PROFILE, protect, requireRole("founder"), asyncHandler(profileCompletionController.completeProfile));
router.put(ROUTES.FOUNDER.PROFILE, protect, requireRole("founder"), asyncHandler(profileCompletionController.updateProfile));
router.get(ROUTES.FOUNDER.PROFILE, protect, requireRole("founder"), asyncHandler(profileCompletionController.getProfile));
router.post(ROUTES.FOUNDER.STARTUPS, protect, requireRole("founder"), asyncHandler(profileCompletionController.addStartup));
router.get(ROUTES.FOUNDER.STARTUP_BY_ID, protect, requireRole("founder"), asyncHandler(profileCompletionController.updateStartup));
router.put(ROUTES.FOUNDER.STARTUP_BY_ID, protect, requireRole("founder"), asyncHandler(profileCompletionController.getStartupById));
router.patch(ROUTES.FOUNDER.STARTUP_STATUS, protect, requireRole("founder"), asyncHandler(profileCompletionController.updateStartupStatus));



export default router