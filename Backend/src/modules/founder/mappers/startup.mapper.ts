

import { IStartupMapper } from "./interfaces/istartup.mapper.js";

import { StartupResponseDto } from "../dtos/response/startup-response.dto.js";

import { IStartupDocument } from "../models/interfaces/startup.interface.js";

export class StartupMapper implements IStartupMapper {

    toResponseDto(startup: IStartupDocument): StartupResponseDto {

        return {
            id: startup._id.toString(),

            founderId: startup.founderId.toString(),

            name: startup.name,

            industry: startup.industry,

            stage: startup.stage,

            website: startup.website,

            tags: startup.tags,

            problem: startup.problem,

            solution: startup.solution,

            fundingAsk: startup.fundingAsk,

            equityOffered: startup.equityOffered,

            elevatorPitch: startup.elevatorPitch,

            pitchDeckUrl: startup.pitchDeckUrl,

            isActive: startup.isActive,

            createdAt: startup.createdAt,

            updatedAt: startup.updatedAt,
        };
    }
}