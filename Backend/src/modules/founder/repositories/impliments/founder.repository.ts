import { BaseRepository } from "../../../../common/repositories/base.repository.js";

import { FounderProfile } from "../../models/founder-profile.model.js";
import { IFounderProfileDocument } from "../../models/interfaces/founder-profile.interface.js";

import { IFounderRepository } from "../interfaces/ifounder.repository.js";

export class FounderRepository extends BaseRepository<IFounderProfileDocument> implements IFounderRepository {

    constructor() {
        super(FounderProfile);
    }

    async findByUserId(userId: string) {
        return this.model.findOne({ userId });
    }

    async upsertByUserId(userId: string, data: Partial<IFounderProfileDocument>) {

        return this.model.findOneAndUpdate(
            { userId },
            {
                $set: data,
            },
            {
                upsert: true,
                new: true,
                runValidators: true,
            }
        );
    }
}