import { IUserDocument } from "../../auth/types/user.types";

export interface IAdminRepository {
    findUsers(page: number, limit: number): Promise<{ users: IUserDocument[]; totalUsers: number; }>;

    findUserById(userId: string): Promise<IUserDocument | null>;

    blockUser(userId: string): Promise<void>;

    unblockUser(userId: string): Promise<void>;

    getDashboardStats(): Promise<{ totalUsers: number; }>;
}