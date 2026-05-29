import { Request, Response } from "express";
import { IAuthController } from "../interface/auth.interface.controller";
import { IAuthService } from "../../services/interface/auth.service.interface";
import { HTTP_STATUS } from "../../../../common/constands/httpStatus";
import { SUCCESS_MESSAGES } from "../../../../common/constands/success-message";
import { ENV } from "../../../../config/env";
import { signupSchema } from "../../validaters/sigup.validaters";
import { forgotPasswordSchema } from "../../validaters/forgotSchema.vlidaters";
import { success } from "zod/mini";
import { COOKIE_MAX_AGE } from "../../../../common/constands/config.constands";
import { verifyForgotPasswordOtpSchema } from "../../validaters/verify-forgot-password.validator";
import { resetPasswordSchema } from "../../validaters/reset-password.validator";



export class AuthController implements IAuthController {
  constructor(
    private authService: IAuthService
  ) { }

  signup = async (req: Request, res: Response) => {
    const validatedData = signupSchema.parse(req.body);

    const user = await this.authService.signup(validatedData);


    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user,
    });
  }


  verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.body


    const response = await this.authService.verifyEmail(token as string)

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
    const { email } = req.body

    await this.authService.resendVerificationEmail(email)

    res.status(HTTP_STATUS.OK).json({ success: true, message: SUCCESS_MESSAGES.AUTH.VERIFICATION_EMAIL_RESENT })

  }


  login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const result = await this.authService.login(email, password)

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

    const result = await this.authService.refreshToken(
      refreshToken
    )

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

    console.log("User logged out successfully controller")
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

    const vlaidateData = forgotPasswordSchema.parse(req.body)

    await this.authService.forgotPassword(vlaidateData.email)

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH.OTP_SEND
    })

  }


  verifyForgotPasswordOtp = async (req: Request, res: Response) => {

    const validatedData = verifyForgotPasswordOtpSchema.parse(req.body)

    await this.authService.verifyForgotPasswordOtp(validatedData.email, validatedData.otp)

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    })
  }


  resetPassword = async (req: Request, res: Response) => {
    const validatedData = resetPasswordSchema.parse(req.body)

    await this.authService.resetPassword(validatedData.email, validatedData.password)

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    })
  }



  resendForgotPasswordOtp = async (req: Request, res: Response) => {
    const result = await this.authService.resendOtpForForgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  }


  getForgotPasswordCooldown = async (req: Request, res: Response) => {
    const { email } = req.query;

    const result = await this.authService.getForgotPasswordCooldown(email as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
}