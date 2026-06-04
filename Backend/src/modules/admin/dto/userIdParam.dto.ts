import { z } from "zod";
import { ERROR_MESSAGES } from "../../../common/constands/error-message.constands";

export const userIdParamDto = z.object({
  userId: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    ERROR_MESSAGES.ADMIN.USER_ID_INVALID
  ),
});

export type UserIdParamDto = z.infer<typeof userIdParamDto>;