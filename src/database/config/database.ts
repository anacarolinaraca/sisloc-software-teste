import mysql, { Pool } from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  port: Number(process.env.DB_PORT) || 3306,
  password: process.env.DB_PASSWORD || 'password',
  // database: process.env.DB_NAME || 'tickets_db',
};

export async function createConnection() {
  const connection: Pool = mysql.createPool(dbConfig);
  await connection.query(`CREATE DATABASE IF NOT EXISTS tickets_db`);
  await connection.getConnection();
  return connection;
}
