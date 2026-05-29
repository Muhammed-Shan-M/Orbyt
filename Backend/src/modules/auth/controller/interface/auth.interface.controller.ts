import { Request, Response } from "express"

export interface IAuthController {
    signup(req: Request, res:Response ): Promise<any>
    verifyEmail(req: Request, res: Response): Promise<any>
    resendVerificationEmail(req:Request, res: Response): Promise<any>

    login(req: Request, res: Response): Promise<any>

    refreshToken(req: Request, res:Response): Promise<any>

    logout(req: Request, res:Response): Promise<any>
    
    getMe(req: Request, res: Response): Promise<any>

    forgotPassword(req: Request, res: Response): Promise<any>

    verifyForgotPasswordOtp(req: Request, res: Response): Promise<any>

    resetPassword(req: Request, res: Response): Promise<any>

    resendForgotPasswordOtp(req: Request, res: Response): Promise<any>

    getForgotPasswordCooldown(req: Request, res: Response): Promise<void>
}