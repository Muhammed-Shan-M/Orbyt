import { User } from '../../models/user.model'
import { IUserDocument } from '../../types/user.types'
import { IUserRepository } from '../interfaces/user.repositery.interface'



import { BaseRepository } from "../../../../common/repositories/base.repository";

export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {

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