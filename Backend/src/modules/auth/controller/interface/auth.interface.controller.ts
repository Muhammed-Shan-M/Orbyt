import { Request, Response } from "express"
import { promises } from "node:dns"

export interface IAuthController {
    signup(req: Request, res:Response ): Promise<any>
}