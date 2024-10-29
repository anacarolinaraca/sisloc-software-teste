import { createConnection } from '../config/database';
export default class Product {
  // Exercicio 2 - Questão A
  public createTables = async () => {
    try {
      const runSql = await createConnection();
      // Use database
      await runSql.query(`
        USE tickets_db;
      `);
      // Create table produto
      await runSql.query(`
        CREATE TABLE IF NOT EXISTS Produto (
          codigo INT(10) NOT NULL auto_increment,
          nome VARCHAR(50) NOT NULL,
          valor FLOAT(10, 2) NOT NULL,
          PRIMARY KEY(codigo)
        ) ENGINE=INNODB;
      `);
    } catch (e) {
      console.log(e);
    }
  };
}
