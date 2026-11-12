import pino from 'pino';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const logger = pino({
    level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
    redact: {
        paths: ['req.headers.authorization', 'req.body.password', 'password'],
        censor: "***REDACTED***",
    },
    transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
        },
    }
    : undefined,
});