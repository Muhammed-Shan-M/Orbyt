import { FounderProfileRequestDto } from "../../dtos/request/founder-profile-request.dto";
import { FounderProfileResponseDto } from "../../dtos/response/founder-profile.response.dto";
import { IFounderMapper } from "../../mappers/interfaces/ifounder.mapper";
import { IFounderRepository } from "../../repositories/interfaces/ifounder.repository";
import { IFounderService } from "../interface/ifounder.service";

export class FounderService implements IFounderService {

    constructor(
        private readonly founderRepository: IFounderRepository,
        private readonly founderMapper: IFounderMapper
    ) { }

    async saveProfile(userId: string, dto: FounderProfileRequestDto): Promise<FounderProfileResponseDto> {

        const existingProfile =
            await this.founderRepository.findByUserId(
                userId
            );

        let founderProfile;

        if (existingProfile) {

            founderProfile = await this.founderRepository.updateById(
                existingProfile.id,
                dto
            );

        } else {

            founderProfile = await this.founderRepository.create({
                userId,
                ...dto,
            });

        }

        return this.founderMapper.toResponseDto(
            founderProfile!
        );
    }
}