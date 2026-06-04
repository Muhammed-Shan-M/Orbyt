import { IUserDocument } from "../../auth/types/user.types";

export const mapUser = (user: IUserDocument) => ({
  _id: user._id.toString() ,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  isApproved: user.isApproved,
  isEmailVerified: user.isEmailVerified,
  isBlocked: user.isBlocked,
  createdAt: user.createdAt,
});