import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../../common/constands/httpStatus";
import { IProfileCompletionService } from "../../services/interface/profile-completion.service";
import { IProfileCompletionController } from "../interface/IProfile-completion.controller";
import { founderProfileRequestSchema } from "../../dtos/request/founder-profile-request.dto";
import { addStartupRequestSchema } from "../../dtos/request/create-startup-request.dto";
import { SUCCESS_MESSAGES } from "../../../../common/constands/success-message";
import { completeProfileRequestSchema } from "../../dtos/request/CompleteProfileRequestDto";
import { updateStartupStatusRequestSchema } from "../../dtos/request/update-startup-status-request.dto";

export class ProfileCompletionController implements IProfileCompletionController {

    constructor(
        private readonly profileCompletionService: IProfileCompletionService
    ) { }

    public async completeProfile(req: Request, res: Response): Promise<void> {

        const dto = completeProfileRequestSchema.parse(req.body);

        const response = await this.profileCompletionService.completeProfile(
            req.user!.userId,
            dto
        );

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: response,
        });
    }


    public async updateProfile(req: Request, res: Response): Promise<void> {

        const dto = founderProfileRequestSchema.parse(req.body);

        const response = await this.profileCompletionService.updateProfile(req.user!.userId, dto);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: response,
        });
    }


    public getProfile = async (req: Request, res: Response): Promise<void> => {

        const profile = await this.profileCompletionService.getProfile(req.user!.userId);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: profile,
        });
    };


    public addStartup = async (req: Request, res: Response): Promise<void> => {

        const dto = addStartupRequestSchema.parse(req.body);

        const startup = await this.profileCompletionService.addStartup(req.user!.userId, dto);

        res.status(HTTP_STATUS.CREATED).json({
            message: SUCCESS_MESSAGES.FOUNDER.STARTUP_CREATED_SUCCESSFULLY,
            data: startup,
        });
    };


    public updateStartup = async (req: Request, res: Response): Promise<void> => {

        const dto = addStartupRequestSchema.parse(req.body);

        const startup = await this.profileCompletionService.updateStartup(
            req.user!.userId,
            req.params.startupId as string,
            dto
        );

        res.status(HTTP_STATUS.OK).json({
            message: SUCCESS_MESSAGES.FOUNDER.STARTUP_UPDATED_SUCCESSFULLY,
            data: startup,
        });
    };


    public getStartupById = async (req: Request, res: Response): Promise<void> => {

        const startup = await this.profileCompletionService.getStartupById(req.user!.userId, req.params.startupId as string);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: startup,
        });
    };

    public updateStartupStatus = async (req: Request, res: Response): Promise<void> => {

        const dto = updateStartupStatusRequestSchema.parse(req.body);

        const startup = await this.profileCompletionService.updateStartupStatus(req.user!.userId, req.params.startupId as string, dto);

        res.status(HTTP_STATUS.OK).json({
            message: SUCCESS_MESSAGES.FOUNDER.STARTUP_STATUS_UPDATED_SUCCESSFULLY,
            data: startup,
        });
    };
}