import * as sinon from 'sinon';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import ProductsController from '../src/controllers/productsController';
import { NextFunction, Request, Response } from 'express';
import ProductService from '../src/services/products.service';
import middleware from '../src/middlewares/validations';

chai.use(sinonChai);
const { expect } = chai;

/*
Apesar de os testes não serem um requisito para este teste técnico, decidi implementar alguns como um adicional para demonstrar meu conhecimento. Compreedo a importância de realizar testes em diferentes casos, sendo casos de sucesso ou de erro.
*/

describe('Product test', function () {
  afterEach(() => {
    sinon.restore();
  });

  const productService = new ProductService();
  const productsController = new ProductsController();

  it('A função calculateTicket deve retornar o valor calculado corretamente', function () {
    const req = { body: { amount: 17 } } as Request;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;
    productsController.calculateTicket(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ message: "R$ 780" });
  });

  it('A função totalSales deve receber o código e a quantidade de ingresso, retornando o cálculo do valor total dos ingressos', async function () {
    const req = {
      body: {
        code: 1,
        quantity: 30
      }
    } as Request;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await productsController.totalSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ message: `R$ 340.8` });
  });

  it('A função totalSales deve retornar erro ao receber um código inválido', async function () {
    sinon.stub(productService, 'totalSales').resolves();
    const req = {
      body: {
        code: 999,
        quantity: 30
      }
    } as Request;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    const next = sinon.stub() as unknown as NextFunction;
    await middleware.verifyProduct(req, res, next);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found.' });
    expect(next).to.not.have.been.called;
  });
})