import pg from 'pg';
import dotenv from 'dotenv';
import { createUserTable } from '../modules/users/user.entity.js';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const initDB = async () => {
    try {
        await pool.query(createUserTable);
        console.log('Tables Initialized');
    } catch (err) {
        console.error('Error initializing tables:', err);
    }
};

pool.connect((err, client, release) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected successfully');
        release();
    }
});

export default pool;