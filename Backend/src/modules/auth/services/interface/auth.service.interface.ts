
import { SignupDTO } from "../../dtos/auth.dtos";


export interface IAuthService {
    verifyEmail(token: string): Promise<any>;
    signup(data: SignupDTO): Promise<any>;
    resendVerificationEmail(email: string): Promise<any>

    login(email: string, password: string): Promise<any>
    adminLogin(email: string, password: string): Promise<any>

    refreshToken(token: string): Promise<any>

    logout(token: string): Promise<any>

    forgotPassword(email: string): Promise<any>

    verifyForgotPasswordOtp(email: string, otp: string): Promise<any>

    resetPassword(email: string, newPassword: string): Promise<any>

    resendOtpForForgotPassword(email: string): Promise<any>

    getForgotPasswordCooldown(email: string): Promise<{ remainingSeconds: number }>
}   