import { ProductNotFoundError } from '../errors/not_found_product_error';
import { products } from '../common/products';
import { InternalServerError } from '../errors/internal_server_error';

export const getProductsById = async (event: ProductPath) => {
  try {
    const product = products.find((e) => e.id === event.path.productId);
    if (!product) throw new ProductNotFoundError();
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    if (error instanceof ProductNotFoundError) return error.errorRes;
    return new InternalServerError().errorRes;
  }
};
