import DiscountProduct from '../database/models/discountProduct.models';
import Product from '../database/models/product.model';

export default class ProductService {
  private productModel;
  private discountProductModel;
  constructor() {
    this.productModel = new Product();
    this.discountProductModel = new DiscountProduct();
  }
  public async createTableProduto() {
    const createTableProduto = await this.productModel.createTables();
    const discountProductModel =
      await this.discountProductModel.createTableDiscountProduct();
    const createTables = [discountProductModel, createTableProduto];
    return createTables;
  }
}
