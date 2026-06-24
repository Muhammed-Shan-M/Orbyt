

export interface StartupResponseDto {
    id: string;

    founderId: string;

    name: string;

    industry: string;

    stage: string;

    website?: string;

    tags?: string[];

    problem: string;

    solution: string;

    fundingAsk: number;

    equityOffered?: number;

    elevatorPitch: string;

    pitchDeckUrl?: string;

    isActive: boolean;

    createdAt: Date;

    updatedAt: Date;
}