import {
  APIGatewayAuthorizerEvent,
  APIGatewayProxyCallback,
  Context,
} from 'aws-lambda';
import { ReasonPhrases } from 'http-status-codes';
import { generatePolicy } from '../utils/generatePolicy';

export const basicAuthorizer = async (
  event: APIGatewayAuthorizerEvent,
  context: Context,
  callback: APIGatewayProxyCallback,
) => {
  console.log(event);

  if (event.type !== 'TOKEN') return callback(ReasonPhrases.UNAUTHORIZED);

  try {
    const authToken = event.authorizationToken;
    const encodedCreds = authToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const userName = plainCreds[0];
    const password = plainCreds[1];
    console.log(`username: ${userName} and password: ${password}`);

    const effect =
      !process.env.PASSWORD || process.env.PASSWORD !== password
        ? 'Deny'
        : 'Allow';
    return generatePolicy(encodedCreds, event.methodArn, effect);
  } catch (error) {
    const e = error as Error;
    return callback(`${ReasonPhrases.UNAUTHORIZED}: ${e.message}`);
  }
};
