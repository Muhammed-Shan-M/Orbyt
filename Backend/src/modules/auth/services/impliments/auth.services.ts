import argon2 from "argon2";
import { IUserRepository } from "../../repositories/interfaces/user.repositery.interface";
import { AppError } from "../../../../common/errors/AppError";
import { IAuthService } from "../interface/auth.service.interface";
import { IRedisService } from "../../../../common/services/redis/resdis.interface";
import { ERROR_MESSAGES } from "../../../../common/constands/error-message.constands";
import { HTTP_STATUS } from "../../../../common/constands/httpStatus";
import { genarateToken } from "../../utils/token.utils";
import { ENV } from "../../../../config/env";
import { genarateAccessToken, genarateRefreshToken } from "../../../../common/utils/genarateTokens";
import { IUserDocument, UserPayLoad } from "../../types/user.types";
import { deleteAllUserRefreshTokens, deleteRefreshToken, getRefreshToken, storeRefreshToken } from "../../utils/redis.utils";
import { verificationEmailTemplate } from "../../../../common/services/email/templates/verification-email.template.ts";
import { IEmailService } from "../../../../common/services/email/interfaces/email-service.interface";
import { generateOtp } from "../../utils/otp.utils";
import { hashValue } from "../../utils/hash.utils";
import { forgotPasswordOtpTemplate } from "../../../../common/services/email/templates/forgot-password-otp.template";
import { OtpData } from "../../types/otp.type";
import { authRedisKeys } from "../../utils/auth.redis-keys";
import { OTP_COOLDOWN_SECONDS, OTP_EXPIRY_SECONDS } from "../../utils/otp.util";
import { SignupRequestDto } from "../../dtos/request/signup.dto";
import { VerifyEmailResponseDto } from "../../dtos/response/verify-email-response.dto";
import { IAuthMapper } from "../../mappers/auth.mapper.interface";
import { AuthResponseDto } from "../../dtos/response/auth-response.dto";
import { LoginRequestDto } from "../../dtos/request/login.dto";
import { ForgotPasswordRequestDto } from "../../dtos/request/forgotPassowed.dto";
import { VerifyForgotPasswordOtpRequestDto } from "../../dtos/request/verifyForgotPassword.dto";
import { ResetPasswordRequestDto } from "../../dtos/request/resetPasswordSchema .dto.";
import { ForgotPasswordCooldownRequestDto } from "../../dtos/request/forgotPasswordCooldown.dto";
import { ForgotPasswordCooldownResponseDto } from "../../dtos/response/forgotPasswordCooldown-respones.dto";



export class AuthService implements IAuthService {
  constructor(
    private authRepo: IUserRepository,
    private redisService: IRedisService,
    private emailService: IEmailService,
    private authMapper: IAuthMapper
  ) { }



  private async createForgotPasswordOtp(user: IUserDocument): Promise<void> {

    const otp = generateOtp();

    const hashedOtp = hashValue(otp);

    const otpKey = authRedisKeys.forgotPasswordOtp(user._id.toString());

    const cooldownKey = authRedisKeys.forgotPasswordCooldown(user._id.toString());

    await this.redisService.set<OtpData>(
      otpKey,
      {
        hashedOtp,
        attempts: 0,
        verified: false,
      },
      OTP_EXPIRY_SECONDS
    );

    await this.redisService.set<boolean>(
      cooldownKey,
      true,
      OTP_COOLDOWN_SECONDS
    );

    const html = forgotPasswordOtpTemplate(otp);

    await this.emailService.sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      html,
    });
  }


  private async authenticateUser(email: string, password: string) {
    const user = await this.authRepo.findByEmail(email);

    if (!user) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    if (!user.isEmailVerified) {
      throw new AppError(ERROR_MESSAGES.AUTH.ACCOUNT_NOT_VERIFIED, HTTP_STATUS.FORBIDDEN);
    }

    if (user.isBlocked) {
      throw new AppError(ERROR_MESSAGES.AUTH.ACCOUNT_BLOCKED, HTTP_STATUS.FORBIDDEN);
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }


    return user;
  }



  async signup(data: SignupRequestDto): Promise<void> {

    const existingUser = await this.authRepo.findByEmail(data.email);

    if (existingUser) {
      throw new AppError(ERROR_MESSAGES.AUTH.USER_ALREADY_EXISTS, HTTP_STATUS.BAD_REQUEST);
    }

    const existing = await this.redisService.get(`verify:${data.email}`)

    if (existing) {
      throw new AppError(ERROR_MESSAGES.AUTH.VERIFICATION_ALREDY_SENT, HTTP_STATUS.BAD_REQUEST)
    }

    const hashedPassword = await argon2.hash(data.password);

    const token = genarateToken()

    await this.redisService.set<UserPayLoad>(
      `verify:${data.email}`,
      {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName || "",
        role: data.role,
        token: token
      },
      600
    )

    await this.redisService.set<string>(
      `verify:${token}`,
      data.email,
      600
    )


    const link = `${ENV.FRONTEND_URL}/verify-email/${token}`;

    const html = verificationEmailTemplate(
      data.fullName,
      link
    );

    await this.emailService.sendEmail({
      to: data.email,
      subject: "Verify Your Email",
      html,
    });



  }


  async verifyEmail(token: string): Promise<VerifyEmailResponseDto> {

    const userEmail = await this.redisService.get(`verify:${token}`)


    if (!userEmail) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED)
    }

    const userData = await this.redisService.get<UserPayLoad>(`verify:${userEmail}`)



    if (!userData) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED)
    }

    const existingUser = await this.authRepo.findByEmail(userData.email)

    if (existingUser) {
      throw new AppError(ERROR_MESSAGES.AUTH.USER_ALREADY_EXISTS, HTTP_STATUS.CONFLICT)
    }

    const user = await this.authRepo.create({
      ...userData,
      isEmailVerified: true
    })

    if (!user) {
      throw new AppError(ERROR_MESSAGES.AUTH.USER_CREATION_FAILED, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    const accessToken = genarateAccessToken(user._id.toString(), user.role)
    const refreshToken = genarateRefreshToken()

    await this.redisService.del(`verify:${userEmail}`)
    await this.redisService.del(`verify:${token}`)

    await storeRefreshToken(
      refreshToken,
      user._id.toString()
    );

    return this.authMapper.toVerifyEmailResponseDto(
      user,
      accessToken,
      refreshToken
    );

  }

  async resendVerificationEmail(email: string): Promise<void> {
    const redisData = await this.redisService.get<UserPayLoad>(`verify:${email}`)

    if (!redisData || !redisData.token) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED)
    }

    await this.redisService.del(redisData.token)

    const newToken = genarateToken()

    redisData.token = newToken

    await this.redisService.set<UserPayLoad>(`verify:${email}`, redisData, 600)

    await this.redisService.set<string>(`verify:${newToken}`, email, 600)

    const link = `${ENV.FRONTEND_URL}/verify-email/${newToken}`;

    const html = verificationEmailTemplate(
      redisData.fullName,
      link
    );

    await this.emailService.sendEmail({
      to: email,
      subject: "Verify Your Email",
      html,
    });

  }



  async login(data: LoginRequestDto): Promise<AuthResponseDto> {

    const user = await this.authenticateUser(data.email, data.password)

    const accessToken = genarateAccessToken(user._id.toString(), user.role)
    const refreshToken = genarateRefreshToken()


    await storeRefreshToken(
      refreshToken,
      user._id.toString()
    );

    return this.authMapper.toAuthResponseDto(user, accessToken, refreshToken);

  }


  async adminLogin(data: LoginRequestDto):Promise<AuthResponseDto> {

    const user = await this.authenticateUser(data.email, data.password);

    if (user.role !== "admin") {
      throw new AppError(ERROR_MESSAGES.AUTH.ADMIN_ACCESS_REQUIRED, HTTP_STATUS.FORBIDDEN);
    }

    const accessToken = genarateAccessToken(user._id.toString(), user.role);

    const refreshToken = genarateRefreshToken();

    await storeRefreshToken(refreshToken, user._id.toString());

    return this.authMapper.toAuthResponseDto(user, accessToken, refreshToken);
  }


  async refreshToken(token: string): Promise<AuthResponseDto> {

    if (!token) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED)
    }

    const userId = await getRefreshToken(token)

    if (!userId) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED)
    }


    const user = await this.authRepo.findById(userId)

    if (!user) {
      throw new AppError(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED)
    }

    if (user.isBlocked) {
      throw new AppError(ERROR_MESSAGES.AUTH.ACCOUNT_BLOCKED, HTTP_STATUS.FORBIDDEN);
    }

    await deleteRefreshToken(token);


    const accessToken = genarateAccessToken(userId, user.role);
    const newRefreshToken = genarateRefreshToken()

    await storeRefreshToken(newRefreshToken, userId)


    return this.authMapper.toAuthResponseDto(user, accessToken, newRefreshToken);

  }


  async logout(token: string): Promise<void> {
    if (!token) {
      throw new AppError(ERROR_MESSAGES.AUTH.TOKEN_MISSING, HTTP_STATUS.UNAUTHORIZED)
    }

    await deleteRefreshToken(token)

  }


  async forgotPassword(data: ForgotPasswordRequestDto): Promise<void> {
    
    const user = await this.authRepo.findByEmail(data.email)

    if (!user) {
      return
    }

    const cooldownKey = `forgot-password-cooldown:${user?._id}`;

    const cooldownExists = await this.redisService.get(cooldownKey);

    if (cooldownExists) {
      throw new AppError(ERROR_MESSAGES.AUTH.PLEASE_WAIT, HTTP_STATUS.TOO_MANY_REQUESTS);
    }

    await this.createForgotPasswordOtp(user)

  }


  async verifyForgotPasswordOtp(data: VerifyForgotPasswordOtpRequestDto): Promise<void> {
    const user = await this.authRepo.findByEmail(data.email)

    if (!user) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_OTP, HTTP_STATUS.BAD_REQUEST)
    }

    const redisKey = `forgot-password:${user._id}`

    const otpData = await this.redisService.get<OtpData>(redisKey)

    if (!otpData) {
      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_OTP, HTTP_STATUS.BAD_REQUEST)
    }


    if (otpData.attempts >= 5) {

      await this.redisService.del(redisKey)

      throw new AppError(ERROR_MESSAGES.AUTH.TOO_MANY_ATTEMPTS, HTTP_STATUS.TOO_MANY_REQUESTS)
    }

    const hashedOtp = hashValue(data.otp)

    const isOtpValid = hashedOtp === otpData.hashedOtp

    if (!isOtpValid) {

      otpData.attempts += 1

      await this.redisService.set<OtpData>(redisKey, otpData, 300)

      throw new AppError(ERROR_MESSAGES.AUTH.INVALID_OTP, HTTP_STATUS.BAD_REQUEST)
    }

    otpData.verified = true

    await this.redisService.set<OtpData>(redisKey, otpData, 300)
  }


  async resetPassword(data: ResetPasswordRequestDto): Promise<void> {

    const user = await this.authRepo.findByEmail(data.email)

    if (!user) {
      throw new AppError(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }

    const redisKey = `forgot-password:${user._id}`

    const otpData = await this.redisService.get<OtpData>(redisKey)

    if (!otpData) {
      throw new AppError(ERROR_MESSAGES.AUTH.OTP_EXPIRED, HTTP_STATUS.BAD_REQUEST)
    }


    if (!otpData.verified) {
      throw new AppError(ERROR_MESSAGES.AUTH.OTP_NOT_VERIFIED, HTTP_STATUS.UNAUTHORIZED)
    }


    const hashedPassword = await argon2.hash(data.password);

    await this.authRepo.updatePassword(user._id.toString(), hashedPassword)

    await this.redisService.del(redisKey)

    await deleteAllUserRefreshTokens(user._id.toString())
  }


  async resendOtpForForgotPassword(data: ForgotPasswordRequestDto): Promise<void> {

    const user = await this.authRepo.findByEmail(data.email);

    if (!user) {
      throw new AppError(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    const cooldownKey = `forgot-password-cooldown:${user._id}`;

    const cooldownExists = await this.redisService.get(cooldownKey);

    if (cooldownExists) {
      throw new AppError(ERROR_MESSAGES.AUTH.PLEASE_WAIT, HTTP_STATUS.TOO_MANY_REQUESTS);
    }

    await this.createForgotPasswordOtp(user);

  }


  async getForgotPasswordCooldown(data: ForgotPasswordCooldownRequestDto): Promise<ForgotPasswordCooldownResponseDto> {

    const user = await this.authRepo.findByEmail(data.email);

    if (!user) {
      return {
        remainingSeconds: 0,
      };
    }

    const cooldownKey = authRedisKeys.forgotPasswordCooldown(
      user._id.toString()
    );

    const ttl = await this.redisService.ttl(cooldownKey);

    return {
      remainingSeconds:
        ttl > 0 ? ttl : 0,
    };
  }
}