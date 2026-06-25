
import { BaseRepository } from "../../../../common/repositories/base.repository.js";

import { Startup } from "../../models/startup.model.js";

import { IStartupDocument } from "../../models/interfaces/startup.interface.js";

import { IStartupRepository } from "../interfaces/istartup.repository.js";


export class StartupRepository extends BaseRepository<IStartupDocument> implements IStartupRepository {

    constructor() {
        super(Startup);
    }

    async findAllByFounderId(founderId: string): Promise<IStartupDocument[]> {

        return this.model.find({
            founderId,
        });
    }

    async findByIdAndFounderId(startupId: string, founderId: string) {
        return this.model.findOne({
            _id: startupId,
            founderId,
        });
    }
}