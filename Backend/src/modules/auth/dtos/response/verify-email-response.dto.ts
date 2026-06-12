import { UserResponseDto } from "./user-response.dto";

export interface VerifyEmailResponseDto {
    user: UserResponseDto;
    accessToken: string;
    refreshToken: string;
}