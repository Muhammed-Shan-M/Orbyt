
import { Types } from "mongoose";
import { IBaseRepository } from "../../../../common/repositories/base.repository.interface.js";
import { IStartupDocument } from "../../models/interfaces/startup.interface.js";

export interface IStartupRepository extends IBaseRepository<IStartupDocument> {

    findAllByFounderId(founderId: Types.ObjectId | string): Promise<IStartupDocument[]>;
    findByIdAndFounderId(startupId:Types.ObjectId | string,  founderId: Types.ObjectId | string): Promise<IStartupDocument | null>;
}