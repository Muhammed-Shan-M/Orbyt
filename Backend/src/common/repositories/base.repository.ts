import { Model, Document, UpdateQuery, Types, } from "mongoose";

export abstract class BaseRepository<T extends Document> {

    constructor(
        protected readonly model: Model<T>
    ) { }

    async findById(id: Types.ObjectId | string) {
        return this.model.findById(id);
    }

    async create(data: Partial<T>) {
        return this.model.create(data);
    }

    async updateById(id: string, data: UpdateQuery<T>) {
        return this.model.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

    async deleteById(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}