import { IBaseRepository } from "../../../../common/repositories/base.repository.interface";
import { IUserDocument } from "../../types/user.types";

export interface IUserRepository extends IBaseRepository<IUserDocument>{
    findByEmail(email: string): Promise<IUserDocument | null>,
    findById(id: string): Promise<IUserDocument | null>
    updatePassword(userId: string, newPassword: string): Promise<void>
}