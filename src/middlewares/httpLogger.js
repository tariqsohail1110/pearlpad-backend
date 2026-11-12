import PinoHttp from "pino-http";
import { logger } from "../config/pinoLogger.js";


export const httpLogger = PinoHttp({
    logger,
    customLogLevel: function (req, res, err) {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
    },
    customSuccessMessage: function (req, res) {
        return `${req.method} ${req.originalUrl} completed with status ${res.statusCode}`;
    },
    customErrorMessage: function (req, res, err) {
        return `${req.method} ${req.originalUrl} failed with status ${res.statusCode}: ${err.message}`;
    },
});