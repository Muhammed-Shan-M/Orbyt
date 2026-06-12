import { Request, Response } from "express"

export interface IAuthController {
    signup(req: Request, res:Response ): Promise<void>
    verifyEmail(req: Request, res: Response): Promise<void>
    resendVerificationEmail(req:Request, res: Response): Promise<void>

    login(req: Request, res: Response): Promise<void>
    adminLogin(req: Request, res: Response): Promise<void>

    refreshToken(req: Request, res:Response): Promise<void>

    logout(req: Request, res:Response): Promise<void>
    
    getMe(req: Request, res: Response): Promise<void>

    forgotPassword(req: Request, res: Response): Promise<void>

    verifyForgotPasswordOtp(req: Request, res: Response): Promise<void>

    resetPassword(req: Request, res: Response): Promise<void>

    resendForgotPasswordOtp(req: Request, res: Response): Promise<void>

    getForgotPasswordCooldown(req: Request, res: Response): Promise<void>
}