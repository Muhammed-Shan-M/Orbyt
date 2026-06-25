

import { z } from "zod";
import { StatusSchema } from "../../validators/founder-profile.validator";

export const updateStartupStatusRequestSchema = z.object({
    status: StatusSchema
});

export type UpdateStartupStatusRequestDto = z.infer<typeof updateStartupStatusRequestSchema>;