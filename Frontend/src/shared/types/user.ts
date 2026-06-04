
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
  isBlocked: boolean;

  status: UserStatus;

  lastLoginAt?: Date;
  profileCompleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser {
  _id: string;
}
