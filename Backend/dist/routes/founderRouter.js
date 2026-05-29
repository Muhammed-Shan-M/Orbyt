"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const auth_routes_1 = __importDefault(require("../modules/auth/routes/auth.routes"));
const routes_1 = require("../common/constands/routes");
const registerRoutes = (app) => {
    app.use(routes_1.ROUTES.AUTH.BASE, auth_routes_1.default);
};
exports.registerRoutes = registerRoutes;
