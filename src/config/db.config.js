import pg from 'pg';
import dotenv from 'dotenv';
import { createUserTable } from '../modules/users/user.entity.js';
import { logger } from './pinoLogger.js';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
    if (err) {
        logger.error('Database connection error:', err.stack);
    } else {
        logger.info('Database connected successfully');
        release();
    }
});

export const initDB = async () => {
    try {
        await pool.query(createUserTable);
        logger.info('Tables Initialized');
    } catch (err) {
        logger.error('Error initializing tables:', err);
    }
};

export default pool;