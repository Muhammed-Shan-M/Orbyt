
import { BaseRepository } from "../../../../common/repositories/base.repository.js";

import { Startup } from "../../models/startup.model.js";

import { IStartupDocument } from "../../models/interfaces/startup.interface.js";

import { IStartupRepository } from "../interfaces/istartup.repository.js";
import { Types } from "mongoose";

export class StartupRepository extends BaseRepository<IStartupDocument> implements IStartupRepository {

    constructor() {
        super(Startup);
    }

    async findByFounderId(founderId: Types.ObjectId | string): Promise<IStartupDocument | null> {

        return this.model.findOne({
            founderId,
        });
    }
}