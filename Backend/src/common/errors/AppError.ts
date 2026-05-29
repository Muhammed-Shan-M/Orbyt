export class AppError extends Error{
    public statusCode: number;
    public isOperational: boolean;
    public code?: string;

    constructor(message: string, statuscode: number, code?: string){
        super(message)

        this.statusCode = statuscode
        this.isOperational = true   
        this.code = code             

        Error.captureStackTrace(this, this.constructor)
    }


}