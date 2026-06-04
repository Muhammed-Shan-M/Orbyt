
import { User } from "../../auth/models/user.model";
import { IAdminRepository } from "./admin.repository.interface";

export class AdminRepository implements IAdminRepository {
    async findUsers(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const [users, totalUsers] = await Promise.all([
            User.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            User.countDocuments(),
        ]);

        return {
            users,
            totalUsers,
        };
    }

    async findUserById(userId: string) {
        return User.findById(userId);
    }

    async blockUser(userId: string) {
        await User.findByIdAndUpdate(userId, { isBlocked: true });
    }

    async unblockUser(userId: string) {
        await User.findByIdAndUpdate(userId, { isBlocked: false });
    }

    async getDashboardStats() {
        const totalUsers = await User.countDocuments();

        return {
            totalUsers,
        };
    }
}