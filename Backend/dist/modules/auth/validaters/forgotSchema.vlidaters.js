"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const schemas_validaters_1 = require("./schemas.validaters");
exports.forgotPasswordSchema = zod_1.default.object({
    email: schemas_validaters_1.emailSchema,
});
