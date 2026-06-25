import { Types } from "mongoose";
import { ERROR_MESSAGES } from "../../../../common/constands/error-message.constands";
import { HTTP_STATUS } from "../../../../common/constands/httpStatus";
import { AppError } from "../../../../common/errors/AppError";
import { AddStartupRequestDto } from "../../dtos/request/create-startup-request.dto";
import { FounderProfileRequestDto } from "../../dtos/request/founder-profile-request.dto";
import { FounderProfileResponseDto } from "../../dtos/response/founder-profile.response.dto";
import { StartupResponseDto } from "../../dtos/response/startup-response.dto";
import { IFounderMapper } from "../../mappers/interfaces/ifounder.mapper";
import { IStartupMapper } from "../../mappers/interfaces/istartup.mapper";
import { IFounderRepository } from "../../repositories/interfaces/ifounder.repository";
import { IStartupRepository } from "../../repositories/interfaces/istartup.repository";
import { IProfileCompletionService } from "../interface/profile-completion.service";
import { CompleteProfileRequestDto } from "../../dtos/request/CompleteProfileRequestDto";
import { CompleteProfileResponseDto } from "../../dtos/response/FounderProfileResponseDto";
import { IUserRepository } from "../../../auth/repositories/interfaces/user.repositery.interface";
import { FounderProfileDetailsResponseDto } from "../../dtos/response/founder-profile-details.response.dto";
import { UpdateStartupStatusRequestDto } from "../../dtos/request/update-startup-status-request.dto";

export class ProfileCompletionService implements IProfileCompletionService {

    constructor(
        private readonly founderRepository: IFounderRepository,
        private readonly startupRepository: IStartupRepository,
        private readonly founderMapper: IFounderMapper,
        private readonly startupMapper: IStartupMapper,
        private readonly userRepository: IUserRepository
    ) { }

    async updateProfile(userId: string, dto: FounderProfileRequestDto): Promise<FounderProfileResponseDto> {

        const founderProfile = await this.founderRepository.upsertByUserId(userId, dto);

        if (!founderProfile) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.PROFILE_SAVE_FAILED, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        return this.founderMapper.toResponseDto(founderProfile);
    }

    async completeProfile(userId: string, dto: CompleteProfileRequestDto): Promise<CompleteProfileResponseDto> {

        const founderProfile = await this.founderRepository.upsertByUserId(userId, dto.founderProfile);

        if (!founderProfile) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.PROFILE_SAVE_FAILED, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        const startup = await this.startupRepository.create({
            founderId: new Types.ObjectId(userId),
            ...dto.startup,
        });

        if (!startup) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.STARTUP_SAVE_FAILED, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        await this.userRepository.updateById(
            userId,
            {
                profileCompleted: true,
            }
        );

        return {
            profile: this.founderMapper.toResponseDto(founderProfile),
            startup: this.startupMapper.toResponseDto(startup),
        };
    }

    async getProfile(userId: string): Promise<FounderProfileDetailsResponseDto> {

        const founderProfile = await this.founderRepository.findByUserId(userId);

        if (!founderProfile) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.PROFILE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const startups = await this.startupRepository.findAllByFounderId(userId);

        return {
            profile: this.founderMapper.toResponseDto(founderProfile),

            startups: startups.map(startup => this.startupMapper.toSummaryDto(startup)),
        };
    }



    async addStartup(founderId: string, dto: AddStartupRequestDto): Promise<StartupResponseDto> {

        const startup = await this.startupRepository.create({ founderId: new Types.ObjectId(founderId), ...dto, });

        if (!startup) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.STARTUP_SAVE_FAILED, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        return this.startupMapper.toResponseDto(startup);
    }


    async updateStartup(founderId: string, startupId: string, dto: AddStartupRequestDto): Promise<StartupResponseDto> {

        const startup = await this.startupRepository.findByIdAndFounderId(startupId, founderId);

        if (!startup) {
            throw new AppError(ERROR_MESSAGES.FOUNDER.STARTUP_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const updatedStartup = await this.startupRepository.updateById(startupId, dto);

        if (!updatedStartup) {
            throw new AppError(
                ERROR_MESSAGES.FOUNDER.STARTUP_SAVE_FAILED,
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }

        return this.startupMapper.toResponseDto(updatedStartup);
    }


    async getStartupById(founderId: string, startupId: string): Promise<StartupResponseDto> {

        const startup = await this.startupRepository.findByIdAndFounderId(startupId, founderId);

        if (!startup) {
            throw new AppError(
                ERROR_MESSAGES.FOUNDER.STARTUP_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            );
        }

        return this.startupMapper.toResponseDto(startup);
    }


    async updateStartupStatus(founderId: string, startupId: string, dto: UpdateStartupStatusRequestDto): Promise<StartupResponseDto> {

        const startup = await this.startupRepository.findByIdAndFounderId(startupId, founderId);

        if (!startup) {
            throw new AppError(
                ERROR_MESSAGES.FOUNDER.STARTUP_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            );
        }

        const updatedStartup = await this.startupRepository.updateById(
            startupId,
            {
                status: dto.status,
            }
        );

        if (!updatedStartup) {
            throw new AppError(
                ERROR_MESSAGES.FOUNDER.STARTUP_SAVE_FAILED,
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }

        return this.startupMapper.toResponseDto(updatedStartup);
    }
}