import { HTTP_STATUS } from "../../../../common/constands/httpStatus";
import { IFounderService } from "../../services/interface/ifounder.service";
import { IFounderController } from "../interface/ifounder.controller";

export class FounderController implements IFounderController {

    constructor(
        private readonly founderService: IFounderService
    ) { }

    async saveProfile(req: Request, res: Response): Promise<void> {


        const profile = await this.founderService.saveProfile(
            req.user!.id,
            req.body
        );

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: profile,
        });

    }
}