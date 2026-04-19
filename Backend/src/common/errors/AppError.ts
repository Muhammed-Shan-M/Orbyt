export class AppError extends Error{
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statuscode: number){
        super(message)

        this.statusCode = statuscode
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }


}