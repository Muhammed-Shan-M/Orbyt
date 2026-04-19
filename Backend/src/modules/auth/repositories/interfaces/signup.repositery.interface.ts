import { IUser } from "../../types/user.types";

export interface IAuthRepository{
    findByEmail(email: string): Promise<any>,
    createUser(user: Partial<IUser>): Promise<any>
}