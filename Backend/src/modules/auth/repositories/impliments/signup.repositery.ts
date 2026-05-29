import {User} from '../../models/user.model'
import { IUser } from '../../types/user.types'
import { IAuthRepository } from '../interfaces/signup.repositery.interface'


export class AuthRepository implements IAuthRepository {
    async findByEmail(email: string) {
        return await User.findOne({email})
    }

    async createUser(data: Partial<IUser>) {
        return await User.create(data)
    }

    async findById(id: string) {
        return await User.findById(id)
    }

    async updatePassword(userId: string, hashedPassword: string) {
        await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        )
    }
}