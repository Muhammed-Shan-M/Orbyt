import { AuthResponseDto } from "../dtos/response/auth-response.dto";
import { UserResponseDto } from "../dtos/response/user-response.dto";
import { VerifyEmailResponseDto } from "../dtos/response/verify-email-response.dto";
import { IUserDocument } from "../types/user.types";

export interface IAuthMapper {
    toUserResponseDto(user: IUserDocument): UserResponseDto;

    toVerifyEmailResponseDto(user: IUserDocument, accessToken: string, refreshToken: string): VerifyEmailResponseDto;

    toAuthResponseDto(user: IUserDocument, accessToken: string, refreshToken: string): AuthResponseDto;
}