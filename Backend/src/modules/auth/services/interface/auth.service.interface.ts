
import { ForgotPasswordRequestDto } from "../../dtos/request/forgotPassowed.dto";
import { ForgotPasswordCooldownRequestDto } from "../../dtos/request/forgotPasswordCooldown.dto";
import { LoginRequestDto } from "../../dtos/request/login.dto";
import { ResetPasswordRequestDto } from "../../dtos/request/resetPasswordSchema .dto.";
import { SignupRequestDto } from "../../dtos/request/signup.dto"; 
import { VerifyForgotPasswordOtpRequestDto } from "../../dtos/request/verifyForgotPassword.dto";
import { AuthResponseDto } from "../../dtos/response/auth-response.dto";
import { ForgotPasswordCooldownResponseDto } from "../../dtos/response/forgotPasswordCooldown-respones.dto";
import { VerifyEmailResponseDto } from "../../dtos/response/verify-email-response.dto";


export interface IAuthService {
    signup(data: SignupRequestDto): Promise<void>;
    
    verifyEmail(token: string): Promise<VerifyEmailResponseDto>;
    
    resendVerificationEmail(email: string): Promise<void>;

    login(data: LoginRequestDto): Promise<AuthResponseDto>

    adminLogin(data: LoginRequestDto): Promise<AuthResponseDto>

    refreshToken(token: string): Promise<AuthResponseDto>

    logout(token: string): Promise<void>

    forgotPassword(data: ForgotPasswordRequestDto): Promise<void>

    verifyForgotPasswordOtp(data: VerifyForgotPasswordOtpRequestDto): Promise<void>

    resetPassword(data: ResetPasswordRequestDto): Promise<void>

    resendOtpForForgotPassword(data: ForgotPasswordRequestDto): Promise<void>

    getForgotPasswordCooldown(data: ForgotPasswordCooldownRequestDto): Promise<ForgotPasswordCooldownResponseDto>
}   