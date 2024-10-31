import { ResultSetHeader } from 'mysql2';
import { createQuery } from '../database/database';

export default class Product {
  /* Exercicio 02 - Questão A 
    Seleciona o banco de dados para executar comandos SQL
  */
  public databaseSelect = async () => {
    await createQuery(`USE tickets_db;`);
  }

  /* Exercicio 02 - Questão A 
    Cria a tabela Produto no banco de dados, se ela não existir, utilizando a query base createQuery.
  */
  public createTableProduct = async () => {
    try {
      await createQuery(`
        CREATE TABLE IF NOT EXISTS Produto (
          codigo INT(10) NOT NULL auto_increment,
          nome VARCHAR(50) NOT NULL,
          valor FLOAT(10, 2) NOT NULL,
          PRIMARY KEY(codigo)
        ) ENGINE=INNODB;
      `);
    } catch (e) {
      console.log(e);
    };
  };

  /* Exercicio 02 - Questão B
    Insere um produto com nome do evento e o valor do ingresso, retornando o código gerado do produto.
  */
  public productInsert = async (name: string, value: number) => {
    const [product] = await createQuery(`
      INSERT INTO tickets_db.Produto (nome, valor)
      VALUES (?, ?);
    `, [name, value]
    );

    const cod = product as ResultSetHeader;
    return cod.insertId;
  };

  /* Exercicio 02 - Questão E
    Busca o produto de acordo com o código do produto.
  */
  public getProduct = async (codeProduct: number) => {
    const [product] = await createQuery(`
      SELECT * FROM tickets_db.Produto WHERE codigo = ?;
    `, [codeProduct]
    );

    const products = product as any;
    return products[0];
  };
}
