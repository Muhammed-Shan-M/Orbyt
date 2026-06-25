import { Request, Response } from "express";

export interface IProfileCompletionController {
    completeProfile(req: Request, res: Response): Promise<void>;

    updateProfile(req: Request, res: Response): Promise<void>;

    getProfile(req: Request, res: Response): Promise<void>;

    addStartup(req: Request, res: Response): Promise<void>;

    updateStartup(req: Request, res: Response): Promise<void>;

    getStartupById(req: Request, res: Response): Promise<void>;

    updateStartupStatus(req: Request, res: Response): Promise<void>;
}