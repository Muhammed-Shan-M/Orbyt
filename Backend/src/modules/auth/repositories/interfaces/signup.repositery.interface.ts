import { IUserDocument } from "../../types/user.types";

export interface IAuthRepository{
    findByEmail(email: string): Promise<IUserDocument | null>,
    findById(id: string):Promise<any>
    createUser(user: Partial<IUserDocument | null>): Promise<any>
    updatePassword(userId: string, newPassword: string): Promise<void>
}