import { createConnection } from '../config/database';
// Exercicio 2 - Questão A
export default class DiscountProduct {
  public createTableDiscountProduct = async () => {
    try {
      const runSql = await createConnection();
      // Use database
      await runSql.query(`
        USE tickets_db;
      `);

      // Create table produto desconto
      await runSql.query(`
        CREATE TABLE IF NOT EXISTS ProdutoDesconto (
          codigo INT(10) NOT NULL,
          quantidade INT(10) NOT NULL,
          valor FLOAT(10, 2) NOT NULL,
          PRIMARY KEY(codigo, quantidade),
          FOREIGN KEY(codigo) REFERENCES Produto(codigo)
        ) ENGINE=INNODB;
      `);
    } catch (e) {
      console.log(e);
    }
  };
}
