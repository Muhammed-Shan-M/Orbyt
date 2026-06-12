
// export const toUserResponse = (user: IUserDocument) => {
//   return {
//     id: user._id,
//     email: user.email,
//     role: user.role,
//     fullName: user.fullName,
//     isVerified: user.isEmailVerified,
//   };
// };


import { IUserDocument } from "../types/user.types.js";
import { UserResponseDto } from "../dtos/response/user-response.dto.js";
import { VerifyEmailResponseDto } from "../dtos/response/verify-email-response.dto.js";
import { IAuthMapper } from "./auth.mapper.interface.js";
import { AuthResponseDto } from "../dtos/response/auth-response.dto.js";

export class AuthMapper implements IAuthMapper {

  toUserResponseDto(user: IUserDocument): UserResponseDto {
    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };
  }

  toVerifyEmailResponseDto(user: IUserDocument, accessToken: string, refreshToken: string): VerifyEmailResponseDto {

    return {
      user: this.toUserResponseDto(user),
      accessToken,
      refreshToken,
    };
  }

  toAuthResponseDto(user: IUserDocument, accessToken: string, refreshToken: string): AuthResponseDto {

    return {
      user: this.toUserResponseDto(user),
      accessToken,
      refreshToken,
    };
  }

}