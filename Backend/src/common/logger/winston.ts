import winston from 'winston';

import {    errorTransport,    combinedTransport,    requestTransport,} from './transports';

const logFormat = winston.format.combine(
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
);

export const appWinstonLogger = winston.createLogger({
    level: 'info',

    format: logFormat,

    transports: [
        new winston.transports.Console(),

        errorTransport,

        combinedTransport,
    ],
});

export const requestWinstonLogger = winston.createLogger({
    level: 'http',

    format: logFormat,

    transports: [
        requestTransport,
    ],
});