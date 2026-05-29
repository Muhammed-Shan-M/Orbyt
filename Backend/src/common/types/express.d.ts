import { IUser } from "../../modules/auth/types/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}


export {};
