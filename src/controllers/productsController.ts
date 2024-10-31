import { Request, Response } from 'express';
import ProductService from '../services/products.service';
import calculateTicketPrice from '../utils/calculateTicketPrice';

export default class ProductsController {
  private productService;

  constructor() {
    this.productService = new ProductService();
  }

  /* Exercicio 01
    Controller para encaminhar a lógica de cálculo para a rota.
    Recebe a quantidade de ingresso e retorna o valor total calculado.  
  */
  public calculateTicket(req: Request, res: Response) {
    const { amount } = req.body;
    const totalPrice = calculateTicketPrice(amount);
    return res.status(200).json({ message: `R$ ${totalPrice}` });
  }

  /* Exercicio 02 - Questão A 
    Controller para criar tabelas no banco de dados e retorna sucesso.
  */
  public async createTables(_req: Request, res: Response) {
    await this.productService.createTables();
    return res.status(200).json({ message: 'Created table successfully!' });
  }

  /* Exercicio 02 - Questão B
    Controller para inserir um produto e retorna um json com o ID do produto.
  */
  public async productInsert(req: Request, res: Response) {
    const { name, value } = req.body;
    const product = await this.productService.productInsert(name, value);
    return res.status(201).json({ message: product });
  }

  /* Exercicio 02 - Questão C
    Controller para inserir um desconto na tabela ProdutoDesconto.
  */
  public async discountProductInsert(req: Request, res: Response) {
    const { code, quantity, value } = req.body;
    await this.productService.discountProductInsert(code, quantity, value);
    return res.status(201).json({ message: "Discount successfully registered!" });
  }

  /* Exercicio 02 - Questão D
    Controller para inserir dados nas tabelas de Produto e ProdutoDesconto, utilizando o valor total de ingresso calculado.
  */
  public async productWithDiscountInsert(req: Request, res: Response) {
    const { name, value, quantity } = req.body;
    await this.productService.productWithDiscountInsert(name, value, quantity);
    return res.status(201).json({ message: "Data registered successfully!" });
  }

  /* Exercicio 02 - Questão E
    Controller para calcular o valor total das vendas de ingressos. Recebendo o código do produto e a quantidade de ingresso a ser vendido.
  */
  public async totalSales(req: Request, res: Response) {
    const { code, quantity } = req.body;
    const totalPrice = await this.productService.totalSales(code, quantity);
    return res.status(200).json({ message: `R$ ${totalPrice}` });
  }
}
