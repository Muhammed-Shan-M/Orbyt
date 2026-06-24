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

const router = Router()

const founderRepository = new FounderRepository();
const startupRepository = new StartupRepository()

const founderMapper = new FounderMapper();
const startupMapper = new StartupMapper()

const profileCompletionService = new ProfileCompletionService(founderRepository, startupRepository, founderMapper, startupMapper);

const profileCompletionController = new ProfileCompletionController(profileCompletionService);



router.post(ROUTES.FOUNDER.PROFILE, protect, requireRole("founder"), asyncHandler(profileCompletionController.saveProfile));
router.get(ROUTES.FOUNDER.PROFILE, protect, requireRole("founder"), asyncHandler(profileCompletionController.getProfile));
router.post(ROUTES.FOUNDER.STARTUP, protect, requireRole("founder"), asyncHandler(profileCompletionController.createStartup));