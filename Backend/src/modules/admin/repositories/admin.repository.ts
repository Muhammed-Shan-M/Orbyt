
import { User } from "../../auth/models/user.model";
import { GetUsersDto } from "../dto/get-user.dto";
import { IAdminRepository } from "./admin.repository.interface";
import { QueryFilter } from 'mongoose';
import { IUser } from "../../auth/types/user.types";

export class AdminRepository implements IAdminRepository {

    async findUsers(query: GetUsersDto) {

        const {
            page,
            limit,
            search,
            role,
            status,
        } = query;

        const skip = (page - 1) * limit;

        const filter: QueryFilter<IUser> = {
            role: {
                $ne: "admin",
            },
        };

        if (search) {
            filter.$or = [
                {
                    fullName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        if (role) {
            filter.role = role;
        }

        if (status) {
            filter.isBlocked =
                status === "blocked";
        }

        const [users, totalUsers] =
            await Promise.all([
                User.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                User.countDocuments(filter),
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