import { createQuery } from '../database/database';

export default class DiscountProduct {
  /* Exercicio 02 - Questão A 
    Cria a tabela ProdutoDesconto no banco de dados, se ela não existir, utilizando a query base createQuery.
  */
  public createTableDiscountProduct = async () => {
    try {
      await createQuery(`
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

  /* Exercicio 02 - Questão C 
    Insere um desconto na tabela ProdutoDesconto, passando o código do produto, quantidade inicial da faixa e o valor com desconto.
  */
  public discountProductInsert = async (code: number, quantity: number, value: number) => {
    await createQuery(`
      INSERT INTO tickets_db.ProdutoDesconto (codigo, quantidade, valor)
      VALUES (?, ?, ?);
    `, [code, quantity, value]
    );
  };

  /* Exercicio 02 - Questão E
    Busca a faixa de desconto do produto e o valor de acordo com o código do produto.
  */
  public getDiscountProduct = async (codeProduct: number) => {
    const [discountProduct] = await createQuery(`
        SELECT quantidade as faixa, valor FROM tickets_db.ProdutoDesconto WHERE codigo = ?
        ORDER BY quantidade ASC;
      `, [codeProduct]
    );

    const discount = discountProduct as any;
    return discount;
  };
}
