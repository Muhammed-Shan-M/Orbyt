import { CreateStartupRequestDto } from "../../dtos/request/create-startup-request.dto.js";
import { FounderProfileRequestDto } from "../../dtos/request/founder-profile-request.dto.js";

import { FounderProfileResponseDto } from "../../dtos/response/founder-profile.response.dto.js";
import { StartupResponseDto } from "../../dtos/response/startup-response.dto.js";

export interface IProfileCompletionService {

    saveProfile(userId: string, dto: FounderProfileRequestDto): Promise<FounderProfileResponseDto>;

    getProfile(userId: string): Promise<FounderProfileResponseDto>;

    createStartup(    founderId: string,    dto: CreateStartupRequestDto): Promise<StartupResponseDto>;
}