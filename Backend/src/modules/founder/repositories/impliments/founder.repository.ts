import { BaseRepository } from "../../../../common/repositories/base.repository.js";

import { FounderProfile } from "../../models/founder-profile.model.js";

import { IFounderRepository } from "../interfaces/ifounder.repository.js";

export class FounderRepository extends BaseRepository<IFounderProfileDocument> implements IFounderRepository {

    constructor() {
        super(FounderProfile);
    }

    async findByUserId(userId: string) {

        return this.model.findOne({
            userId,
        });
    }
}