// import { z } from "zod";

// export const getUsersDto = z.object({
//   page: z.coerce.number().min(1).default(1),
//   limit: z.coerce.number().min(1).max(50).default(10),
// });

// export type GetUsersDto = z.infer<typeof getUsersDto>;


import { z } from "zod";

export const getUsersDto = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(50).default(10),

  search: z
    .string()
    .trim()
    .max(100)
    .optional(),

  role: z
    .enum(["founder", "investor"])
    .optional(),

  status: z
    .enum(["active", "blocked"])
    .optional(),
});

export type GetUsersDto =
  z.infer<typeof getUsersDto>;