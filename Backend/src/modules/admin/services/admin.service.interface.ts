import { IPaginatedUsers, IUserListResponse, } from "../types/admin.types";

export interface IAdminService {
    getUsers(page: number, limit: number): Promise<IPaginatedUsers>;

    getUser(userId: string): Promise<IUserListResponse>;

    blockUser(userId: string): Promise<void>;

    unblockUser(userId: string): Promise<void>;

    getDashboardStats(): Promise<{ totalUsers: number; }>;
}
