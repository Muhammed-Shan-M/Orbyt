import { IUserDocument } from "../types/user.types.js";

export const toUserResponse = (user: IUserDocument) => {
  return {
    id: user._id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    isVerified: user.isEmailVerified,
  };
};