import { UserRole } from "../../modules/auth/types/user.types";

export interface JwtPayload {
    userId: string;
    role: UserRole
}
