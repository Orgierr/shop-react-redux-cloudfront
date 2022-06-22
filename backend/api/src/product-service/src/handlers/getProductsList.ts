import { products } from '../common/products';
import { ProductService } from '../db/db';

export const getProductsList = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(await ProductService.findAll(products)),
  };
};
