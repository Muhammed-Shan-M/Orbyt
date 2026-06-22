// import { injectable } from "tsyringe";

import { IFounderMapper } from "./interfaces/ifounder.mapper.js";

export class FounderMapper implements IFounderMapper {

    public toResponseDto(founderProfile) {

        return {
            id: founderProfile.id,
            userId: founderProfile.userId.toString(),

            roleTitle: founderProfile.roleTitle,

            bio: founderProfile.bio,

            linkedinUrl: founderProfile.linkedinUrl,

            twitterUrl: founderProfile.twitterUrl,

            website: founderProfile.website,

            experienceYears: founderProfile.experienceYears,

            skills: founderProfile.skills,

            previousStartups: founderProfile.previousStartups,

            achievements: founderProfile.achievements,

            createdAt: founderProfile.createdAt,

            updatedAt: founderProfile.updatedAt,
        };
    }
}