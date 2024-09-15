import { APIGatewayEvent } from 'aws-lambda';
import { ServiceError } from '../errors/ServiceError';
import { StatusCodes } from 'http-status-codes';
import { ServiceRes } from '../types/service_res';
import axios from 'axios';
export const getCognitoIdToken = async (
  event?: APIGatewayEvent & { code: string },
): Promise<ServiceRes> => {
  console.log(event);
  const productPath = event.path as unknown as { code: string };
  const code = productPath.code;
  const token = Buffer.from(
    `${process.env.API_ID}:${process.env.API_SECRET}`,
  ).toString('base64');

  try {
    const result = await axios.post(
      `https://${process.env.DOMAIN}.auth.eu-central-1.amazoncognito.com/oauth2/token?client_id=${process.env.API_ID}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}&code=${code}`,
      null,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${token}`,
        },
      },
    );

    return {
      statusCode: StatusCodes.OK,
      body: result.data.id_token,
    };
  } catch (error) {
    return ServiceError.errorResponse(error);
  }
};
