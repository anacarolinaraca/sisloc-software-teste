import DiscountProduct from '../models/discountProduct.models';
import Product from '../models/product.model';
import calculateTicketPrice from '../utils/calculateTicketPrice';

export default class ProductService {
  private productModel;
  private discountProductModel;

  constructor() {
    this.productModel = new Product();
    this.discountProductModel = new DiscountProduct();
  };

  /*
    Exercicio 02 - Questão A 
    Inicializa as tabelas no banco de dados.
    É utilizado o async e await porque as operações do banco de dados são assíncronas.
  */
  public async createTables(): Promise<void> {
    await this.productModel.databaseSelect();
    await this.productModel.createTableProduct();
    await this.discountProductModel.createTableDiscountProduct();
  };

  /* Exercicio 02 - Questão B
    Insere um produto com nome e o valor do ingresso, retornando o ID do produto.
  */
  public async productInsert(name: string, value: number): Promise<number> {
    const productId = await this.productModel.productInsert(name, value);
    return productId;
  };

  /* Exercicio 02 - Questão C
    Insere um desconto passnado o código, a quantidade da faixa e o valor com desconto.
  */
  public async discountProductInsert(code: number, quantity: number, value: number): Promise<void> {
    await this.discountProductModel.discountProductInsert(code, quantity, value);
  };

  /* Exercicio 02 - Questão D
  Solução: 
    - A função calculateTicketPrice calcula o valor total dos ingressos com desconto;
    - A função productInsert insere um ingresso no banco com seu respectivo valor;
    - O valor com desconto retornado pela função calculateTicketPrice é utilizado na função de inserção de produtos com desconto.

    Possíveis adaptações: 
    - Ajustar a função calculateTicketPrice para receber por parâmetro o valor do ingresso e os descontos por faixa;
  */
  public productWithDiscountInsert = async (name: string, value: number, quantity: number): Promise<void> => {
    const totalPrice = calculateTicketPrice(quantity);
    const productId = await this.productInsert(name, value);
    await this.discountProductModel.discountProductInsert(productId, quantity, totalPrice);
  };

  /* Exercicio 02 - Questão E
    - Esta função recebe o código do produto e a quantidade de ingressos a ser vendidos, retornando o valor total da venda;
    - As funções getProductInitialPrice e getDiscountProduct realizam consultas nas tabelas de Produto e ProdutoDesconto;
    - As variáveis destacadas guardam valores durante o cálculo;
    - O loop for faz iterações de acordo com a quantidade de faixas de desconto registradas no banco de dados;
    - Após o loop, o if verifica se ainda faltam ingressos para ser calculados e retorna a soma total das vendas.

    OBS: Em caso de grande volume de dados, seria melhor realizar um JOIN entre as tabelas para buscar os dados e evitar duas requisições ao banco, o que deixaria processo mais eficiente.
  */
  public totalSales = async (codeProduct: number, ticketQuantity: number): Promise<number> => {
    const getProductInitialPrice = await this.productModel.getProduct(codeProduct);
    const getDiscountProduct = await this.discountProductModel.getDiscountProduct(codeProduct);

    let totalSalesAmount = 0;
    let ticketsCalculated = 0;
    let lastRangeQuantity = 0;
    let lastRangeValue = getProductInitialPrice.valor;

    for (let i = 0; i < getDiscountProduct.length; i++) {
      if (ticketQuantity > getDiscountProduct[i].faixa) {
        lastRangeQuantity = getDiscountProduct[i].faixa - lastRangeQuantity;
        totalSalesAmount += lastRangeQuantity * lastRangeValue;
        lastRangeValue = getDiscountProduct[i].valor;
        ticketsCalculated += lastRangeQuantity;
      }
    }

    if (ticketsCalculated < ticketQuantity) {
      lastRangeQuantity = ticketQuantity - ticketsCalculated;
      totalSalesAmount += lastRangeQuantity * lastRangeValue;
    }
    return totalSalesAmount;
  };
}
