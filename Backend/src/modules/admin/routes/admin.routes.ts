import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { AdminService } from "../services/admin.service";
import { AdminRepository } from "../repositories/admin.repository";
import { ROUTES } from "../../../common/constands/routes";

const router = Router();


const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

router.get(ROUTES.ADMIN.DASHBOARD, adminController.dashboard);

router.get(ROUTES.ADMIN.USERS, adminController.getUsers);

router.get(ROUTES.ADMIN.USER, adminController.getUser);

router.patch(ROUTES.ADMIN.BLOCK_USER, adminController.blockUser);

router.patch(ROUTES.ADMIN.UNBLOCK_USER, adminController.unblockUser);

export default router;