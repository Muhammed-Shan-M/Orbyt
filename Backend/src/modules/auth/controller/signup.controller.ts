import { Request, Response } from "express";

import { AuthService } from "../services/signup.services";
import { asyncHandler } from "../../../common/utils/asynHandler";
import { AuthRepository } from "../repositories/signup.repositery";
import { toUserResponse } from "../mappers/signup.mappers";

const authService = new AuthService(new AuthRepository());

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.signup(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});