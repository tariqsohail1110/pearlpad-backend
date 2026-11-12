import express from "express";
import dotenv from 'dotenv';
import { initDB } from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import { httpLogger } from "./middlewares/httpLogger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./config/pinoLogger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(httpLogger);

await initDB();

app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
app.use(errorHandler);

app.get('/', (req, res) =>{
    res.json({ message: 'Pearl Pad API is running' })
});

const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
});