import { logger } from "../config/pinoLogger.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    logger.error({
        err,
        reqId: req.id,
        url: req.originalUrl,
        method: req.method,
        statusCode,
    }, `Exception caught in global handler: ${message}`);

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
};