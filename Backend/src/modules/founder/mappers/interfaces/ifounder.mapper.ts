
import { FounderProfileResponseDto } from "../../dtos/response/founder-profile.response.dto.js";
import { IFounderProfileDocument } from "../../models/interfaces/founder-profile.interface.js";

export interface IFounderMapper {
    toResponseDto(founderProfile: IFounderProfileDocument): FounderProfileResponseDto;

}