import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { AdminService } from "../services/admin.service";
import { AdminRepository } from "../repositories/admin.repository";
import { ROUTES } from "../../../common/constands/routes";
import { asyncHandler } from "../../../common/utils/asynHandler";
import { protect } from "../../../common/middleware/protect.middlewares";
import { requireRole } from "../../../common/middleware/authorization.middleware";
import { AdminMapper } from "../mappers/admin.mapper";

const router = Router();


const adminRepository = new AdminRepository();
const adminMapper = new AdminMapper()
const adminService = new AdminService(adminRepository,adminMapper);
const adminController = new AdminController(adminService);

router.get(ROUTES.ADMIN.DASHBOARD, asyncHandler(protect), asyncHandler(requireRole("admin")), asyncHandler(adminController.dashboard));

router.get(ROUTES.ADMIN.USERS, asyncHandler(protect), asyncHandler(requireRole("admin")), asyncHandler(adminController.getUsers));

router.get(ROUTES.ADMIN.USER, asyncHandler(protect), asyncHandler(requireRole("admin")), asyncHandler(adminController.getUser));

router.patch(ROUTES.ADMIN.BLOCK_USER, asyncHandler(protect), asyncHandler(requireRole("admin")), asyncHandler(adminController.blockUser));

router.patch(ROUTES.ADMIN.UNBLOCK_USER, asyncHandler(protect), asyncHandler(requireRole("admin")), asyncHandler(adminController.unblockUser));

export default router;