import z from "zod";
import { addStartupRequestSchema } from "./create-startup-request.dto";
import { founderProfileRequestSchema } from "./founder-profile-request.dto";

export const completeProfileRequestSchema = z.object({
    founderProfile: founderProfileRequestSchema,
    startup: addStartupRequestSchema,
});

export type CompleteProfileRequestDto = z.infer<typeof completeProfileRequestSchema>;