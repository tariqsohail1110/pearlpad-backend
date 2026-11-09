export const User = {
    tableName: 'users',
    columns: {
        id: 'SERIAL PRIMARY KEY',
        first_name: 'VARCHAR(50) NOT NULL',
        last_name: 'VARCHAR(50) NOT NULL',
        email: 'VARCHAR(75) NOT NULL',
        password: 'TEXT NOT NULL',
        is_active: 'BOOLEAN DEFAULT FALSE NOT NULL',
        created_at: 'TIMESTAMP DEFAULT NOW()'
    }
};

export const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        id              SERIAL PRIMARY KEY,
        first_name      VARCHAR(50) NOT NULL,
        last_name       VARCHAR(50) NOT NULL,
        email           VARCHAR(75) NOT NULL,
        password        TEXT,
        is_active       BOOLEAN DEFAULT FALSE NOT NULL,
        created_at      TIMESTAMP DEFAULT NOW()
    );
`