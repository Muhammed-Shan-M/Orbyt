
import { Types } from "mongoose";
import { IBaseRepository } from "../../../../common/repositories/base.repository.interface.js";
import { IStartupDocument } from "../../models/interfaces/startup.interface.js";

export interface IStartupRepository extends IBaseRepository<IStartupDocument> {

    findByFounderId(founderId: Types.ObjectId | string): Promise<IStartupDocument | null>;
}