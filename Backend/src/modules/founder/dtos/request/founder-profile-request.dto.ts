import { z } from "zod";
import { founderProfileSchema } from "../../validators/founder-profile.validator.js";

export type FounderProfileRequestDto = z.infer<typeof founderProfileSchema>;