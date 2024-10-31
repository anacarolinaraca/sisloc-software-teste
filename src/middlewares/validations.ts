import { NextFunction, Request, Response } from "express";
import { createQuery } from "../database/database";
import { OkPacket } from "mysql2";

export default class Validations {
  /*
    Verifica se já existe um desconto com o mesmo código e quantidade no banco.
  */
  static async verifyDuplicateDiscount(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { code, quantity } = req.body;
    const [product] = await createQuery(`
        SELECT * FROM tickets_db.ProdutoDesconto WHERE codigo = ? AND quantidade = ?
      `, [code, quantity]);

    if ((product as OkPacket[]).length > 0) {
      return res.status(409).json({ message: 'There is already a discount registered with this code and quantity.' });
    } else {
      next();
    }
  }

  /*
    Verifica se o código do ingresso existe na tabela de produto.
  */
  static async verifyProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { code } = req.body;
    const [products] = await createQuery(`
        SELECT * FROM tickets_db.Produto WHERE codigo = ?
      `, [code]);
    const product = products as OkPacket[];
    if (product.length == 0) {
      return res.status(409).json({ message: 'Product not found.' });
    } else {
      next();
    }
  }

  /*
    Valida se o valor de entrada é um número inteiro positivo.
  */
  static async validateCalculateTicket(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { amount } = req.body;
    if (!Number.isInteger(amount) || amount <= 0) {
      return res.status(409).json({ message: 'The amount must be a positive integer.' });
    } else {
      next();
    }
  }

  /*
    Valida se o valor de entrada do nome não é vazio e se é um número positivo.
  */
  static async validateNameAndValue(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { name, value } = req.body;

    if (typeof name !== 'string' || name.length <= 0) {
      return res.status(409).json({ message: 'The name must be a string and cannot be empty.' });
    }
    if (typeof value !== 'number' || value <= 0) {
      return res.status(409).json({ message: 'The value must be a positive number.' });
    }
    next();
  }

  /*
    Valida se o valor de entrada dos dados são números positivos.
  */
  static async validateCodeQuantityValue(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { code, quantity, value } = req.body;

    const codeCondition = !Number.isInteger(code) || code <= 0;
    const quantityCondition = !Number.isInteger(quantity) || quantity <= 0;
    const valueCondition = typeof value !== 'number' || value <= 0;

    if (codeCondition) {
      return res.status(409).json({ message: 'The code must be a positive integer.' });
    }
    if (quantityCondition) {
      return res.status(409).json({ message: 'The quantity must be a positive integer.' });
    }
    if (valueCondition) {
      return res.status(409).json({ message: 'The value must be a positive number.' });
    }
    next();
  }

  /*
    Valida se o valor de entrada dos dados são números positivos e o name é uma string.
  */
  static async validateNameQuantityValue(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { name, quantity, value } = req.body;

    const nameCondition = typeof name !== 'string' || name.length <= 0;
    const quantityCondition = !Number.isInteger(quantity) || quantity <= 0;
    const valueCondition = typeof value !== 'number' || value <= 0;

    if (nameCondition) {
      return res.status(409).json({ message: 'The name must be a string and cannot be empty.' });
    }
    if (quantityCondition) {
      return res.status(409).json({ message: 'The quantity must be a positive integer.' });
    }
    if (valueCondition) {
      return res.status(409).json({ message: 'The value must be a positive number.' });
    }
    next();
  }

  /*
    Valida se o valor de entrada dos dados são números positivos.
  */
  static async validateCodeQuantity(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { code, quantity } = req.body;

    const codeCondition = !Number.isInteger(code) || code <= 0;
    const quantityCondition = !Number.isInteger(quantity) || quantity <= 0;

    if (codeCondition) {
      return res.status(409).json({ message: 'The code must be a positive integer.' });
    }
    if (quantityCondition) {
      return res.status(409).json({ message: 'The quantity must be a positive integer.' });
    }
    next();
  }
}