import {User} from '../models/user.model'
import { IUser } from '../types/user.types'
import { IAuthRepository } from './interfaces/signup.repositery.interface'


export class AuthRepository implements IAuthRepository {
    async findByEmail(email: string) {
        return await User.findOne({email})
    }

    async createUser(data: Partial<IUser>) {
        return await User.create(data)
    }
}