import DailyRotateFile from 'winston-daily-rotate-file';

export const errorTransport = new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxFiles: '5d',
    auditFile: 'logs/error-audit.json',
});

export const combinedTransport = new DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '5d',
    auditFile: 'logs/combined-audit.json',
});

export const requestTransport = new DailyRotateFile({
    filename: 'logs/request-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '5d',
    auditFile: 'logs/request-audit.json',
});