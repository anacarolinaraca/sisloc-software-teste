import { Request, Response, Router } from 'express';
import ProductsController from '../controllers/productsController';
import Validations from '../middlewares/validations';

const productsController = new ProductsController();
const router = Router();

/* Desestruturação das funções middleware */
const {
  verifyDuplicateDiscount,
  verifyProduct,
  validateCalculateTicket,
  validateNameAndValue,
  validateCodeQuantityValue,
  validateNameQuantityValue,
  validateCodeQuantity
} = Validations;

/* Exercicio 01
  Rota para testar o exercício 01.
*/
router.post('/calculate-price', validateCalculateTicket, (req: Request, res: Response) => {
  productsController.calculateTicket(req, res);
});

/* Exercicio 02 - Questão A
  Rota para testar o criação das tabelas.
*/
router.get('/', (_req: Request, res: Response) => {
  productsController.createTables(_req, res);
});

/* Exercicio 02 - Questão B
  Rota para testar inserção de um produto.
*/
router.post('/product-insert', validateNameAndValue, (req: Request, res: Response) => {
  productsController.productInsert(req, res);
});

/* Exercicio 02 - Questão C
  Rota para testar inserção de um desconto, com middleware para validar se já existe um desconto com o mesmo código e quantidade no banco.
  Também verifica se o código do produto existe na tabela de produto.
*/
router.post('/discount-product-insert',
  verifyDuplicateDiscount,
  verifyProduct,
  validateCodeQuantityValue,
  (req: Request, res: Response) => {
    productsController.discountProductInsert(req, res);
  });

/* Exercicio 02 - Questão D
  Rota para testar a inserção de dados de produtos com o valor total dos ingressos no banco de dados.
*/
router.post('/data-insert', validateNameQuantityValue, (req: Request, res: Response) => {
  productsController.productWithDiscountInsert(req, res);
});

/* Exercicio 02 - Questão E
  Rota para calcular e testar o valor total das vendas de ingressos.
*/
router.post('/total-sales', validateCodeQuantity, verifyProduct, (req: Request, res: Response) => {
  productsController.totalSales(req, res);
});

export default router;
