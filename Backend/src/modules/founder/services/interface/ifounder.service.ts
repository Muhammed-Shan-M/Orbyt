import { FounderProfileRequestDto } from "../../dtos/request/founder-profile-request.dto.js";

import { FounderProfileResponseDto } from "../../dtos/response/founder-profile.response.dto.js";

export interface IFounderService {

    saveProfile(userId: string, dto: FounderProfileRequestDto): Promise<FounderProfileResponseDto>;
}