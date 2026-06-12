import { IUserDocument } from "../../auth/types/user.types";
import { PaginatedUsersResponseDto } from "../dto/respones/PaginatedUsersResponse.dto";
import { UserResponseDto } from "../dto/respones/user-response.dto";

export interface IAdminMapper {
  toResponse(user: IUserDocument): UserResponseDto;
  toPaginatedUsersResponse(user: UserResponseDto[], totalUsers: number, currentPage: number, limit: number): PaginatedUsersResponseDto
}