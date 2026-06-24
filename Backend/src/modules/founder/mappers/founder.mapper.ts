// import { injectable } from "tsyringe";

import { IFounderProfileDocument } from "../models/interfaces/founder-profile.interface.js";
import { IFounderMapper } from "./interfaces/ifounder.mapper.js";

export class FounderMapper implements IFounderMapper {

    public toResponseDto(founderProfile: IFounderProfileDocument) {

        return {
            id: founderProfile._id.toString(),
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