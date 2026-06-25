import { CompleteProfileRequestDto } from "../../dtos/request/CompleteProfileRequestDto.js";
import { AddStartupRequestDto } from "../../dtos/request/create-startup-request.dto.js";
import { FounderProfileRequestDto } from "../../dtos/request/founder-profile-request.dto.js";
import { UpdateStartupStatusRequestDto } from "../../dtos/request/update-startup-status-request.dto.js";
import { FounderProfileDetailsResponseDto } from "../../dtos/response/founder-profile-details.response.dto.js";

import { FounderProfileResponseDto } from "../../dtos/response/founder-profile.response.dto.js";
import { CompleteProfileResponseDto } from "../../dtos/response/FounderProfileResponseDto.js";
import { StartupResponseDto } from "../../dtos/response/startup-response.dto.js";

export interface IProfileCompletionService {

    completeProfile(userId: string, dto: CompleteProfileRequestDto): Promise<CompleteProfileResponseDto>;

    updateProfile(userId: string, dto: FounderProfileRequestDto): Promise<FounderProfileResponseDto>;

    getProfile(userId: string): Promise<FounderProfileDetailsResponseDto>;

    addStartup(founderId: string, dto: AddStartupRequestDto): Promise<StartupResponseDto>;

    updateStartup(founderId: string, startupId: string, dto: AddStartupRequestDto): Promise<StartupResponseDto>;

    getStartupById(founderId: string, startupId: string): Promise<StartupResponseDto>;

    updateStartupStatus(founderId: string, startupId: string, dto: UpdateStartupStatusRequestDto): Promise<StartupResponseDto>;
}