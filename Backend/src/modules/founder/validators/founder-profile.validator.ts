import { z } from "zod";

export const founderProfileSchema = z.object({
    roleTitle: z.string().trim().max(100),

    bio: z.string().trim().max(1000),

    linkedinUrl: z.string().url().optional(),

    twitterUrl: z.string().url().optional(),

    website: z.string().url().optional(),

    experienceYears: z.number().min(0).max(100),

    skills: z.array(z.string()).optional(),

    previousStartups: z.array(z.string()).optional(),

    achievements: z.array(z.string()).optional(),
}); 