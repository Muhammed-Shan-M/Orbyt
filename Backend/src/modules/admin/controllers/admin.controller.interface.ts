import { Request, Response, NextFunction } from "express";

export interface IAdminController {
    
    getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;

    getUser(req: Request, res: Response, next: NextFunction): Promise<void>;

    blockUser(req: Request, res: Response, next: NextFunction): Promise<void>;

    unblockUser(req: Request, res: Response, next: NextFunction): Promise<void>;

    dashboard(req: Request, res: Response, next: NextFunction): Promise<void>;
}

