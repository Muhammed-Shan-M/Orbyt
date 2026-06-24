import { Types } from "mongoose";
import { ERROR_MESSAGES } from "../../../../common/constands/error-message.constands";
import { HTTP_STATUS } from "../../../../common/constands/httpStatus";
import { AppError } from "../../../../common/errors/AppError";
import { CreateStartupRequestDto } from "../../dtos/request/create-startup-request.dto";
import { FounderProfileRequestDto } from "../../dtos/request/founder-profile-request.dto";
import { FounderProfileResponseDto } from "../../dtos/response/founder-profile.response.dto";
import { StartupResponseDto } from "../../dtos/response/startup-response.dto";
import { IFounderMapper } from "../../mappers/interfaces/ifounder.mapper";
import { IStartupMapper } from "../../mappers/interfaces/istartup.mapper";
import { IFounderRepository } from "../../repositories/interfaces/ifounder.repository";
import { IStartupRepository } from "../../repositories/interfaces/istartup.repository";
import { IProfileCompletionService } from "../interface/profile-completion.service";

export class ProfileCompletionService implements IProfileCompletionService {

    constructor(
        private readonly founderRepository: IFounderRepository,
        private readonly startupRepository: IStartupRepository,
        private readonly founderMapper: IFounderMapper,
        private readonly startupMapper: IStartupMapper
    ) { }

    async saveProfile(userId: string, dto: FounderProfileRequestDto): Promise<FounderProfileResponseDto> {

        const founderProfile = await this.founderRepository.upsertByUserId(userId, dto);

        if (!founderProfile) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.PROFILE_SAVE_FAILED, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        return this.founderMapper.toResponseDto(founderProfile);
    }


    async getProfile(userId: string): Promise<FounderProfileResponseDto> {

        const founderProfile = await this.founderRepository.findByUserId(userId);

        if (!founderProfile) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.PROFILE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        return this.founderMapper.toResponseDto(founderProfile);
    }

    

    async createStartup(founderId: string, dto: CreateStartupRequestDto): Promise<StartupResponseDto> {

        const existingStartup = await this.startupRepository.findByFounderId(founderId);

        if (existingStartup) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.STARTUP_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
        }

        const startup = await this.startupRepository.create({ founderId: new Types.ObjectId(founderId), ...dto, });

        return this.startupMapper.toResponseDto(startup);
    }
}