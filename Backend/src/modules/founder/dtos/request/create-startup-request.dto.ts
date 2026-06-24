
import { z } from "zod";


import { startupNameSchema, startupIndustrySchema, startupStageSchema, fundingAskSchema, equityOfferedSchema, startupDescriptionSchema, urlSchema, stringArraySchema } from "../../validators/founder-profile.validator";

export const createStartupRequestSchema = z.object({
    name: startupNameSchema,

    industry: startupIndustrySchema,

    stage: startupStageSchema,

    website: urlSchema.optional(),

    tags: stringArraySchema.optional(),

    problem: startupDescriptionSchema,

    solution: startupDescriptionSchema,

    fundingAsk: fundingAskSchema,

    equityOffered: equityOfferedSchema.optional(),

    elevatorPitch: startupDescriptionSchema,

    pitchDeckUrl: urlSchema.optional(),
});

export type CreateStartupRequestDto = z.infer<typeof createStartupRequestSchema>;