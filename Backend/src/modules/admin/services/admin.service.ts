
import { ERROR_MESSAGES } from "../../../common/constands/error-message.constands";
import { AppError } from "../../../common/errors/AppError";
import { GetUsersDto } from "../dto/get-user.dto";
import { mapUser } from "../mappers/user.mapper";
import { IAdminRepository } from "../repositories/admin.repository.interface";
import { IAdminService } from "./admin.service.interface";

export class AdminService
    implements IAdminService {
    constructor(
        private readonly adminRepository: IAdminRepository
    ) { }

    async getUsers(query: GetUsersDto) {
        const { users, totalUsers, } = await this.adminRepository.findUsers(query);

        // return {
        //     users: users.map(mapUser),
        //     totalUsers,
        //     currentPage: page,
        //     totalPages: Math.ceil(totalUsers / limit),
        // };

        return {
            users: users.map(mapUser),
            totalUsers,
            currentPage: query.page,
            totalPages: Math.ceil(
                totalUsers / query.limit
            ),
        };
    }

    async getUser(userId: string) {
        const user = await this.adminRepository.findUserById(userId);

        if (!user) {
            throw new AppError(ERROR_MESSAGES.ADMIN.USER_NOT_FOUND, 404);
        }

        return mapUser(user);
    }

    async blockUser(userId: string) {
        await this.adminRepository.blockUser(userId);
    }

    async unblockUser(userId: string) {
        await this.adminRepository.unblockUser(userId);
    }

    async getDashboardStats() {
        return this.adminRepository.getDashboardStats();
    }
}