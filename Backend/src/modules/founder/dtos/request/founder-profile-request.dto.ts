import { z } from "zod";


import { stringArraySchema, roleTitleSchema, bioSchema, experienceYearsSchema, urlSchema, } from "../../validators/founder-profile.validator";

export const founderProfileRequestSchema = z.object({
    roleTitle: roleTitleSchema,

    bio: bioSchema,

    linkedinUrl: urlSchema.optional(),

    twitterUrl: urlSchema.optional(),

    website: urlSchema.optional(),

    experienceYears: experienceYearsSchema,

    skills: stringArraySchema.optional(),

    previousStartups: stringArraySchema.optional(),

    achievements: stringArraySchema.optional(),
});

export type FounderProfileRequestDto = z.infer<typeof founderProfileRequestSchema>;