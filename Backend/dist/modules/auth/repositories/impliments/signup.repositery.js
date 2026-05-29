"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const user_model_1 = require("../../models/user.model");
class AuthRepository {
    async findByEmail(email) {
        return await user_model_1.User.findOne({ email });
    }
    async createUser(data) {
        return await user_model_1.User.create(data);
    }
    async findById(id) {
        return await user_model_1.User.findById(id);
    }
}
exports.AuthRepository = AuthRepository;
