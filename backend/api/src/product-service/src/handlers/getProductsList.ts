import { APIGatewayEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { ServiceError } from '../errors/ServiceError';
import { ProductRepository } from '../repository/productRepositoy';
import { ServiceRes } from '../types/service_res';

export const getProductsList = async (
  event?: APIGatewayEvent,
): Promise<ServiceRes> => {
  console.log(event);
  try {
    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify(await ProductRepository.findAll()),
    };
  } catch (error) {
    return ServiceError.errorResponse(error);
  }
};
