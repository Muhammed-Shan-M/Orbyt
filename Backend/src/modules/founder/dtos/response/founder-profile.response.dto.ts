

export interface FounderProfileResponseDto {
    id: string;
    userId: string;

    roleTitle?: string;
    bio?: string;

    linkedinUrl?: string;
    twitterUrl?: string;
    website?: string;

    experienceYears?: number;

    skills?: string[];
    previousStartups?: string[];
    achievements?: string[];

    createdAt: Date;
    updatedAt: Date;
}