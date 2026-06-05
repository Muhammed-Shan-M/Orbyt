export interface IBaseRepository<T> {

    findById(id: string): Promise<T | null>;

    create(data: Partial<T>): Promise<T>;

    updateById(id: string, data: Partial<T>): Promise<T | null>;

    deleteById(id: string): Promise<T | null>;

}