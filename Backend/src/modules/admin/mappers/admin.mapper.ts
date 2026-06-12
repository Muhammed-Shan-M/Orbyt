import { IUserDocument } from "../../auth/types/user.types";
import { PaginatedUsersResponseDto } from "../dto/respones/PaginatedUsersResponse.dto";
import { UserResponseDto } from "../dto/respones/user-response.dto";
import { IAdminMapper } from "./admin.mappers.interface";

export class AdminMapper implements IAdminMapper {
  toResponse(user: IUserDocument): UserResponseDto {
    return {
      _id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
      isEmailVerified: user.isEmailVerified,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
    };
  }

  toPaginatedUsersResponse(users: UserResponseDto[], totalUsers: number, currentPage: number, limit: number): PaginatedUsersResponseDto {
    return {
      users,
      totalUsers,
      currentPage,
      totalPages: Math.ceil(totalUsers / limit),
    };
  }
}