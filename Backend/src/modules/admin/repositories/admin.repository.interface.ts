import { IUserDocument } from "../../auth/types/user.types";
import { GetUsersDto } from "../dto/get-user.dto";

export interface IAdminRepository {
    findUsers(query: GetUsersDto): Promise<{ users: IUserDocument[]; totalUsers: number; }>;

    findUserById(userId: string): Promise<IUserDocument | null>;

    blockUser(userId: string): Promise<void>;

    unblockUser(userId: string): Promise<void>;

    getDashboardStats(): Promise<{ totalUsers: number; }>;
}