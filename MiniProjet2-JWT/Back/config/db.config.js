require('dotenv').config();

module.exports = {
    hostname: process.env.HOSTNAME || 'localhost',
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "jwt",
    dialect: "postgresql",
    port: process.env.DB_PORT || 5432,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};