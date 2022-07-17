import { APIGatewayAuthorizerEvent } from 'aws-lambda';
import { ReasonPhrases } from 'http-status-codes';
import { generatePolicy } from '../utils/generatePolicy';

export const basicAuthorizer = async (event: APIGatewayAuthorizerEvent) => {
  console.log();
  if (event.type !== 'TOKEN') return ReasonPhrases.UNAUTHORIZED;

  try {
    const authToken = event.authorizationToken;
    const encodedCreds = authToken.split(' ')[1];
    const buff = Buffer.from(authToken, 'base64');
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
    return `${ReasonPhrases.UNAUTHORIZED}: ${e.message}`;
  }
};
