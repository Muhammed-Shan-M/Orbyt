"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const founderRouter_1 = require("./routes/founderRouter");
const error_middleware_1 = require("./common/middleware/error.middleware");
const AppError_1 = require("./common/errors/AppError");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = require("./config/cors");
const app = (0, express_1.default)();
app.use(cors_1.corsMiddleware);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
(0, founderRouter_1.registerRoutes)(app);
app.use((req, res, next) => {
    next(new AppError_1.AppError(`Route not found: ${req.originalUrl}`, 404));
});
app.use(error_middleware_1.globalErrorHandler);
exports.default = app;
