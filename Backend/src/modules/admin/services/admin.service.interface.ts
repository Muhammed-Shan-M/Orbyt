import { GetUsersDto } from "../dto/request/get-user.dto";
import { PaginatedUsersResponseDto } from "../dto/respones/PaginatedUsersResponse.dto";
import { UserResponseDto } from "../dto/respones/user-response.dto";


export interface IAdminService {
    getUsers(query: GetUsersDto): Promise<PaginatedUsersResponseDto>;

    getUser(userId: string): Promise<UserResponseDto>;

    blockUser(userId: string): Promise<void>;

    unblockUser(userId: string): Promise<void>;

    getDashboardStats(): Promise<{ totalUsers: number; }>;
}
