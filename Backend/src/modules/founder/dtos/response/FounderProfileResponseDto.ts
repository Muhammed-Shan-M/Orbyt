import { FounderProfileResponseDto } from "./founder-profile.response.dto";
import { StartupResponseDto } from "./startup-response.dto";

export interface CompleteProfileResponseDto {
    profile: FounderProfileResponseDto;
    startup: StartupResponseDto;
}