import { IUserDocument } from "../../types/user.types";

export interface IAuthRepository{
    findByEmail(email: string): Promise<IUserDocument | null>,
    findById(id: string):Promise<IUserDocument | null>
    create(user: Partial<IUserDocument | null>): Promise<IUserDocument | null>,
    updatePassword(userId: string, newPassword: string): Promise<void>
}