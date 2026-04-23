import argon2 from "argon2";
import { IAuthRepository } from "../repositories/interfaces/signup.repositery.interface.js";
import { AppError } from "../../../common/errors/AppError.js";
import { SignupDTO } from "../dtos/auth.dtos.js"; 
import { toUserResponse } from "../mappers/auth.mappers.js";

export class AuthService {
  constructor(private authRepo: IAuthRepository) {}

  async signup(data: SignupDTO) {

    const existingUser = await this.authRepo.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await argon2.hash(data.password);

    const user = await this.authRepo.createUser({
      ...data,
      password: hashedPassword,
    });

    return toUserResponse(user);
  }
}