
import { ERROR_MESSAGES } from "../../../common/constands/error-message.constands";
import { HTTP_STATUS } from "../../../common/constands/httpStatus";
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


    private async validateUserAction(userId: string) {
        const user = await this.adminRepository.findById(userId);

        if (!user) {
            throw new AppError(
                ERROR_MESSAGES.AUTH.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            );
        }

        if (user.role === "admin") {
            throw new AppError(
                ERROR_MESSAGES.ADMIN.ADMIN_CANNOT_BE_MODIFIED,
                HTTP_STATUS.FORBIDDEN
            );
        }

        return user;
    }

    async getUsers(query: GetUsersDto) {
        const { users, totalUsers, } = await this.adminRepository.findUsers(query);

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
        const user = await this.adminRepository.findById(userId);

        if (!user) {
            throw new AppError(ERROR_MESSAGES.ADMIN.USER_NOT_FOUND, 404);
        }

        return mapUser(user);
    }

    async blockUser(userId: string) {

        const user = await this.validateUserAction(userId);

        if (user.isBlocked) {
            throw new AppError(
                ERROR_MESSAGES.ADMIN.USER_ALREADY_BLOCKED,
                HTTP_STATUS.BAD_REQUEST
            );
        }

        await this.adminRepository.blockUser(userId);
    }

    async unblockUser(userId: string) {

        const user = await this.validateUserAction(userId);

        if (!user.isBlocked) {
            throw new AppError(
                ERROR_MESSAGES.ADMIN.USER_ALREADY_ACTIVE,
                HTTP_STATUS.BAD_REQUEST
            );
        }

        await this.adminRepository.unblockUser(userId);
    }

    async getDashboardStats() {
        return this.adminRepository.getDashboardStats();
    }
}