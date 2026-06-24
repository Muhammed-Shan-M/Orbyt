import { Request, Response } from "express";

export interface IProfileCompletionController {
    saveProfile(req: Request, res: Response): Promise<void>;

    getProfile(req: Request, res: Response): Promise<void>;

    createStartup(req: Request, res: Response): Promise<void>;
}