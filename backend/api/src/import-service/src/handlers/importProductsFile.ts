import { APIGatewayEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { ServiceError } from '../errors/ServiceError';
import { s3UploadUrl } from '../utils/signedUrl';
export const importProductsFile = async (
  event?: APIGatewayEvent & QueryFileName,
) => {
  console.log(event);

  try {
    return {
      statusCode: StatusCodes.OK,
      body: await s3UploadUrl(event.query.fileName),
    };
  } catch (error) {
    return ServiceError.errorResponse(error);
  }
};
