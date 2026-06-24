import { IBaseRepository } from "../../../../common/repositories/base.repository.interface";
import { FounderProfileRequestDto } from "../../dtos/request/founder-profile-request.dto";
import { IFounderProfileDocument } from "../../models/interfaces/founder-profile.interface";

export interface IFounderRepository extends IBaseRepository<IFounderProfileDocument> {

    findByUserId(userId: string): Promise<IFounderProfileDocument | null>;

    upsertByUserId(userId: string, data: FounderProfileRequestDto) : Promise<IFounderProfileDocument | null>;
}