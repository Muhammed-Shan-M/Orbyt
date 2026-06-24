import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../../common/constands/httpStatus";
import { IProfileCompletionService } from "../../services/interface/profile-completion.service";
import { IProfileCompletionController } from "../interface/IProfile-completion.controller";
import { founderProfileRequestSchema } from "../../dtos/request/founder-profile-request.dto";
import { createStartupRequestSchema } from "../../dtos/request/create-startup-request.dto";
import { SUCCESS_MESSAGES } from "../../../../common/constands/success-message";

export class ProfileCompletionController implements IProfileCompletionController {

    constructor(
        private readonly profileCompletionService: IProfileCompletionService
    ) { }

    async saveProfile(req: Request, res: Response): Promise<void> {
        const dto = founderProfileRequestSchema.parse(req.body);

        const profile = await this.profileCompletionService.saveProfile(req.user!.userId, dto);

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: profile,
        });

    }


    public getProfile = async (req: Request, res: Response): Promise<void> => {

        const profile = await this.profileCompletionService.getProfile(req.user!.userId);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: profile,
        });
    };


    public createStartup = async (req: Request, res: Response): Promise<void> => {

        const dto = createStartupRequestSchema.parse(req.body);

        const startup = await this.profileCompletionService.createStartup(req.user!.userId, dto);

        res.status(HTTP_STATUS.CREATED).json({
            message: SUCCESS_MESSAGES.FOUNDER.STARTUP_CREATED_SUCCESSFULLY,
            data: startup,
        });
    };
}