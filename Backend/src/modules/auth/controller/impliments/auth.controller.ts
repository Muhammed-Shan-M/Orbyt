import { Request, Response } from "express";
import { IAuthController } from "../interface/auth.interface.controller";
import { IAuthService } from "../../services/interface/auth.service.interface";
import { HTTP_STATUS } from "../../../../common/constands/httpStatus";
import { SUCCESS_MESSAGES } from "../../../../common/constands/success-message";
import { ENV } from "../../../../config/env";
import { COOKIE_MAX_AGE } from "../../../../common/constands/config.constands";
import { SignupRequestDto, signupSchema } from "../../dtos/request/signup.dto";
import { VerifyEmailRequestDto, verifyEmailSchema } from "../../dtos/request/verify-email.dto";
import { ResendVerificationEmailRequestDto, resendVerificationEmailSchema } from "../../dtos/request/resend-verification-email.dto";
import { LoginRequestDto, loginSchema } from "../../dtos/request/login.dto";
import { ForgotPasswordRequestDto, forgotPasswordSchema } from "../../dtos/request/forgotPassowed.dto";
import { VerifyForgotPasswordOtpRequestDto, verifyForgotPasswordOtpSchema } from "../../dtos/request/verifyForgotPassword.dto";
import { ResetPasswordRequestDto, resetPasswordSchema } from "../../dtos/request/resetPasswordSchema .dto.";
import { ForgotPasswordCooldownRequestDto, forgotPasswordCooldownSchema } from "../../dtos/request/forgotPasswordCooldown.dto";



export class AuthController implements IAuthController {
  constructor(
    private authService: IAuthService
  ) { }

  signup = async (req: Request, res: Response) => {
    const validatedData: SignupRequestDto = signupSchema.parse(req.body);

    await this.authService.signup(validatedData);


    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.VERIFICATION_EAMIL_SENT
    });
  }


  verifyEmail = async (req: Request, res: Response) => {

    const validatedData: VerifyEmailRequestDto = verifyEmailSchema.parse(req.body);

    const response = await this.authService.verifyEmail(validatedData.token as string)

    res.cookie(
      "refreshToken",
      response.refreshToken,
      {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: COOKIE_MAX_AGE,
      }
    )

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED,
      accessToken: response.accessToken,
      user: response.user
    })
  }


  resendVerificationEmail = async (req: Request, res: Response) => {
    const validatedData: ResendVerificationEmailRequestDto = resendVerificationEmailSchema.parse(req.body);

    await this.authService.resendVerificationEmail(validatedData.email);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.VERIFICATION_EMAIL_RESENT,
    })

  }


  login = async (req: Request, res: Response) => {

    const validatedData: LoginRequestDto = loginSchema.parse(req.body);

    const result = await this.authService.login(validatedData)

    res.cookie(
      "refreshToken",
      result.refreshToken,
      {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    )

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
      user: result.user,
      accessToken: result.accessToken
    })
  }

  adminLogin = async (req: Request, res: Response) => {
    const validatedData: LoginRequestDto = loginSchema.parse(req.body);

    const result = await this.authService.adminLogin(validatedData)

    res.cookie(
      "refreshToken",
      result.refreshToken,
      {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    )

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
      user: result.user,
      accessToken: result.accessToken
    })
  }

  refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    const result = await this.authService.refreshToken(refreshToken)

    res.cookie(
      'refreshToken',
      result.refreshToken,
      {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    )

    res.status(HTTP_STATUS.OK).json(
      {
        success: true,
        message: "Refreshtoken created",
        accessToken: result.accessToken,
        user: result.user
      }
    )
  }


  logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken

    await this.authService.logout(refreshToken)

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
    })

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS,
    });
  }


  getMe = async (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
      success: true,
      user: req.user
    })
  }


  forgotPassword = async (req: Request, res: Response) => {

    const vlaidateData: ForgotPasswordRequestDto = forgotPasswordSchema.parse(req.body)

    await this.authService.forgotPassword(vlaidateData)

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.OTP_SEND
    })

  }


  verifyForgotPasswordOtp = async (req: Request, res: Response) => {

    const validatedData: VerifyForgotPasswordOtpRequestDto = verifyForgotPasswordOtpSchema.parse(req.body)

    await this.authService.verifyForgotPasswordOtp(validatedData)

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'OTP verified successfully',
    })
  }


  resetPassword = async (req: Request, res: Response) => {
    const validatedData: ResetPasswordRequestDto = resetPasswordSchema.parse(req.body)

    await this.authService.resetPassword(validatedData)

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Password reset successfully',
    })
  }



  resendForgotPasswordOtp = async (req: Request, res: Response) => {

    const validateDate: ForgotPasswordRequestDto = forgotPasswordSchema.parse(req.body.email)

    await this.authService.resendOtpForForgotPassword(validateDate);

    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.RESEND_OTP,
    });
  }


  getForgotPasswordCooldown = async (req: Request, res: Response) => {
   const validatedData:ForgotPasswordCooldownRequestDto = forgotPasswordCooldownSchema.parse(req.query);

    const result = await this.authService.getForgotPasswordCooldown(validatedData);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
}