import { validate } from 'uuid';
import { APIGatewayEvent } from 'aws-lambda';
import { ServiceError } from '../errors/ServiceError';
import { StatusCodes } from 'http-status-codes';
import { ProductRepository } from '../repository/productRepositoy';
import { ServiceRes } from '../types/service_res';
export const getProductsById = async (
  event?: APIGatewayEvent & ProductPath,
): Promise<ServiceRes> => {
  console.log(event);
  const productPath = event.path as unknown as ProductPath;
  try {
    if (!validate(productPath.productId))
      throw new ServiceError({
        statusCode: StatusCodes.BAD_REQUEST,
        body: 'Product id is invalid',
      });

    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify(
        await ProductRepository.findById(productPath.productId),
      ),
    };
  } catch (error) {
    return ServiceError.errorResponse(error);
  }
};
