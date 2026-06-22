import { Request, Response } from "express";

export interface IFounderController {

    saveProfile(req: Request, res: Response): Promise<void>;
}