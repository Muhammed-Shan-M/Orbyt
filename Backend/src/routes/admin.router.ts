import { Application } from "express";
import adminRoutes from "../modules/admin/routes/admin.routes";
import { ROUTES } from "../common/constands/routes";

export const registerAdminRoutes = (app: Application) => {
    app.use(ROUTES.ADMIN.BASE, adminRoutes);
}; 
