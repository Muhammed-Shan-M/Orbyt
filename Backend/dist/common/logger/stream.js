"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const stream = {
    write: (message) => {
        if (message.includes("500")) {
            logger_1.default.error(message.trim());
        }
        else {
            logger_1.default.info(message.trim());
        }
    }
};
exports.default = stream;
