import { Request, Response } from 'express';
import calculateTicketPrice from '../utils/calculateTicketPrice';
import ProductService from '../services/product.service';

export default class TicketController {
  private productService;
  constructor() {
    this.productService = new ProductService();
  }
  public async ticket(req: Request, res: Response) {
    await this.createTableProduto();
    return res.json('Created table successfully!');
  }
  public async createTableProduto() {
    return this.productService.createTableProduto();
  }
}
