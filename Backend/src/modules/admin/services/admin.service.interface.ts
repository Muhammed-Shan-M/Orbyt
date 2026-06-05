import { GetUsersDto } from "../dto/get-user.dto";
import { IPaginatedUsers, IUserListResponse, } from "../types/admin.types";

export interface IAdminService {
    getUsers(query: GetUsersDto): Promise<IPaginatedUsers>;

    getUser(userId: string): Promise<IUserListResponse>;

    blockUser(userId: string): Promise<void>;

    unblockUser(userId: string): Promise<void>;

    getDashboardStats(): Promise<{ totalUsers: number; }>;
}
