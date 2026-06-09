import winston from 'winston';
import { combinedTransport, errorTransport } from './transports';



const logger = winston.createLogger({
    level: 'info',

    format: winston.format.combine(
        winston.format.timestamp(),

        winston.format.errors({
            stack: true,
        }),

        winston.format.printf(
            ({ timestamp, level, message, stack }) => {
                if (stack) {
                    return `${timestamp} [${level}] ${stack}`;
                }

                return `${timestamp} [${level}] ${message}`;
            },
        ),
    ),

    transports: [
        new winston.transports.Console(),

        errorTransport,

        combinedTransport,
    ],
});

export default logger;