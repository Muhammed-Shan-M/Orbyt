import { Router } from "express";
import { signup } from "../controller/signup.controller";
import { ROUTES } from "../../../common/constands/routes";

const router = Router();

router.post(ROUTES.AUTH.SIGNUP, signup);

export default router;