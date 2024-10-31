import mysql, { Pool } from 'mysql2/promise';


/* Cria um pool de conexões com o banco de dados e verifica se o banco de dados existe, caso contrário, cria o banco. */
export async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: Number(process.env.DB_PORT) || 3306,
    password: process.env.DB_PASSWORD || 'password',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS tickets_db`);

  await connection.end();

  /* Configuração com o banco de dados */
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: Number(process.env.DB_PORT) || 3306,
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'tickets_db',
  };
  const connectionPool: Pool = mysql.createPool(dbConfig);
  return connectionPool;
}

/* Query base para executar os comando SQL */
export async function createQuery(sql: string, params: Array<any> = []) {
  const connection = await createConnection();
  const query = connection.query(sql, params);
  return query;
}
