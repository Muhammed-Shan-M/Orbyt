import { IFounderProfileDocument } from "../../models/interfaces/founder-profile.interface";

export interface IFounderRepository {

    findByUserId(userId: string): Promise<IFounderProfileDocument | null>;
}