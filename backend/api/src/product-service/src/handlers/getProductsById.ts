import { ProductNotFoundError } from '../errors/not_found_product_error';
import { products } from '../common/products';
import { InternalServerError } from '../errors/internal_server_error';
import { ProductService } from '../db/db';

export const getProductsById = async (event: ProductPath) => {
  try {
    const product = await ProductService.findById(
      products,
      event.path.productId,
    );
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
