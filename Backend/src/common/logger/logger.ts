import {    appWinstonLogger,    requestWinstonLogger,} from './winston';



class Logger {

    info(...args: unknown[]): void {
        appWinstonLogger.info(this.format(args));
    }

    warn(...args: unknown[]): void {
        appWinstonLogger.warn(this.format(args));
    }

    error(...args: unknown[]): void {
        appWinstonLogger.error(this.format(args));
    }

    http(...args: unknown[]): void {
        requestWinstonLogger.http(this.format(args));
    }

    private format(args: unknown[]): string {
        return args.map((arg) => {
                if (arg instanceof Error) {
                    return arg.stack ?? arg.message;
                }

                if (typeof arg === 'object' && arg !== null) {
                    return JSON.stringify(arg);
                }

                return String(arg);
            })
            .join(' ');
    }
}

const logger = new Logger();

export default logger;