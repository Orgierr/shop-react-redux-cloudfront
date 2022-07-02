jest.mock('@aws-sdk/s3-request-presigner');
const { getSignedUrl } = jest.requireMock('@aws-sdk/s3-request-presigner');
import { APIGatewayEvent } from 'aws-lambda';
import * as handler from '../handler';

describe('Test import products file', () => {
  test('return signed url', async () => {
    const testUrl = 'https://test.com';
    getSignedUrl.mockReturnValue(Promise.resolve(testUrl));
    const queryStringParameters = {
      query: { fileName: 'test.csv' },
    } as APIGatewayEvent & QueryFileName;
    const result = await handler.importProductsFile(queryStringParameters);
    expect(result.body).toEqual(testUrl);
  });
});
