"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const schemas_validaters_1 = require("./schemas.validaters");
exports.signupSchema = zod_1.default.object({
    fullName: schemas_validaters_1.fullNameSchema,
    email: schemas_validaters_1.emailSchema,
    password: schemas_validaters_1.passwordSchema,
    confirmPassword: zod_1.default.string(),
    role: schemas_validaters_1.roleSchema,
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
