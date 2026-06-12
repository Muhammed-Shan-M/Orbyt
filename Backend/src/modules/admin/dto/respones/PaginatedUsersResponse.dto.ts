import { UserResponseDto } from "./user-response.dto";

export interface PaginatedUsersResponseDto {
    users: UserResponseDto[];
    totalUsers: number;
    currentPage: number;
    totalPages: number;
}