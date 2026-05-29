"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./common/database/db");
const PORT = Number(env_1.ENV.PORT);
(0, db_1.connectDB)().then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`server running at: http://localhost:${PORT}`);
    });
});
