import { Request, Response } from "express";
import { AuthService } from "../../services/auth.services";
import { IAuthController } from "../interface/auth.interface.controller";


export class AuthController implements IAuthController{
  constructor(private authService: AuthService) {}

  async signup(req: Request, res: Response){
    const user = await this.authService.signup(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }
}