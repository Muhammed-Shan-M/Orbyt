import { Request, Response } from "express";
import { IAdminService } from "../services/admin.service.interface";
import { HTTP_STATUS } from "../../../common/constands/httpStatus";
import { userIdParamDto } from "../dto/userIdParam.dto";
import { getUsersDto } from "../dto/get-user.dto";

export class AdminController {
    constructor(
        private readonly adminService: IAdminService
    ) { }

    dashboard = async (req: Request, res: Response,) => {

        const data = await this.adminService.getDashboardStats();

        res.status(HTTP_STATUS.OK).json(data);

    };

    getUsers = async (req: Request, res: Response) => {

        // const { page, limit } = getUsersDto.parse(req.query);

        // const users = await this.adminService.getUsers(
        //     page,
        //     limit
        // );

        const query = getUsersDto.parse(req.query);

        const users = await this.adminService.getUsers(query);

        res.status(HTTP_STATUS.OK).json(users);

    };

    getUser = async (req: Request, res: Response,) => {

        const { userId } = userIdParamDto.parse(req.params);

        const user = await this.adminService.getUser(userId);

        res.status(HTTP_STATUS.OK).json(user);

    };

    blockUser = async (req: Request, res: Response,) => {

        const { userId } = userIdParamDto.parse(req.params);

        await this.adminService.blockUser(userId);

        res.status(HTTP_STATUS.OK).json({ success: true });

    };

    unblockUser = async (req: Request, res: Response) => {

        const { userId } = userIdParamDto.parse(req.params);

        await this.adminService.unblockUser(userId);

        res.status(HTTP_STATUS.OK).json({ success: true });

    };
}