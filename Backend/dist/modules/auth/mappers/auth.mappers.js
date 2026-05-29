"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
const toUserResponse = (user) => {
    return {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        isVerified: user.isEmailVerified,
    };
};
exports.toUserResponse = toUserResponse;
