import { Application } from "express";
import authRoutes from '../modules/auth/routes/auth.routes'
import { ROUTES } from "../common/constands/routes";

export const registerRoutes = (app: Application) => {
  app.use(ROUTES.AUTH.BASE, authRoutes);
};