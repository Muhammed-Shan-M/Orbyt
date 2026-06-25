

import { FounderProfileResponseDto } from "./founder-profile.response.dto.js";

export interface StartupSummaryResponseDto {
    id: string;
    name: string;
    industry: string;
    stage: string;
    fundingAsk: number;
    elevatorPitch: string;
    website?: string;
    isActive: boolean;
}

export interface FounderProfileDetailsResponseDto {
    profile: FounderProfileResponseDto;
    startups: StartupSummaryResponseDto[];
}