import { User } from '../../models/user.model'
import { IUserDocument } from '../../types/user.types'
import { IAuthRepository } from '../interfaces/signup.repositery.interface'



import { BaseRepository } from "../../../../common/repositories/base.repository";

export class AuthRepository extends BaseRepository<IUserDocument> implements IAuthRepository {

    constructor() {
        super(User);
    }

    async findByEmail(email: string) {
        return this.model.findOne({ email, });
    }

    async updatePassword(userId: string, hashedPassword: string) {
        await this.updateById(
            userId,
            {
                password: hashedPassword,
            }
        );
    }
}