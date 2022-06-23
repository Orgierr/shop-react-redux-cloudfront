import { v4 as uuidv4 } from 'uuid';
import { productSchema } from '../joi/productSchema';
import { APIGatewayEvent } from 'aws-lambda';
import { ServiceError } from '../errors/ServiceError';
import { StatusCodes } from 'http-status-codes';
import { ProductRepository } from '../repository/productRepositoy';
export const postProduct = async (event: APIGatewayEvent) => {
  console.log(event);

  try {
    const newProduct = event.body as unknown as Product;
    const { error } = productSchema.validate(newProduct);
    if (error)
      throw new ServiceError({
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Product data is invalid',
      });

    newProduct.id = uuidv4();
    await ProductRepository.create(newProduct);
    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(newProduct),
    };
  } catch (error) {
    return ServiceError.errorResponse(error);
  }
};
