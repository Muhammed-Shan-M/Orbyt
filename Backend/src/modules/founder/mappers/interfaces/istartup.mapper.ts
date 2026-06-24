
import { StartupResponseDto } from "../../dtos/response/startup-response.dto.js";
import { IStartupDocument } from "../../models/interfaces/startup.interface.js";

export interface IStartupMapper {

    toResponseDto(startup: IStartupDocument): StartupResponseDto;
}