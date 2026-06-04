import type { IUserDocument } from "@/shared/types/user";


// export interface AdminUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "founder" | "investor" | "admin";

//   isBlocked: boolean;
//   isApproved: boolean;
//   isEmailVerified: boolean;

//   createdAt: string;
// }

export interface UsersResponse {
  users: IUserDocument[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
}