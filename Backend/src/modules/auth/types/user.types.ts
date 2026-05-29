import { Types } from "mongoose";
import { string } from "zod";

export type UserRole = "founder" | "investor" | "admin";


export type UserStatus = "active" | "blocked";

export interface IUser {
  email: string;
  password: string;
  role: UserRole;

  fullName?: string;
  profileImageUrl?: string;
  location?: string;

  isEmailVerified: boolean;
  isApproved: boolean;

  status: UserStatus;

  lastLoginAt?: Date;
  profileCompleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}


export interface IUserDocument extends IUser {
  _id: Types.ObjectId;
}


// export type UserPayLoad = Partial<IUser> & {token?: string}
export interface UserPayLoad {
  email: string,
  password: string,
  fullName: string,
  role: UserRole,
  token: string
}