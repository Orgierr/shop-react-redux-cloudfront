import { SQSEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import * as handler from '../handler';
import { ProductRepository } from '../src/repository/productRepositoy';

jest.mock('@aws-sdk/client-sns', () => {
  return {
    SNSClient: jest.fn().mockImplementation(() => {
      return { send: () => Promise.resolve() };
    }),
    PublishCommand: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});
ProductRepository.create = jest.fn().mockReturnValue(Promise.resolve());

const sqsEvent = {
  Records: [
    {
      messageId: 'string',
      receiptHandle: 'string',
      md5OfBody: 'string',
      eventSource: 'string',
      eventSourceARN: 'string',
      awsRegion: 'string',
      attributes: {
        ApproximateReceiveCount: 'string',
        SentTimestamp: 'string',
        SenderId: 'string',
        ApproximateFirstReceiveTimestamp: 'string',
      },
      messageAttributes: {},
      body: JSON.stringify({
        count: 4,
        price: 201,
        title: 'Product Title1',
        description: 'This product ...1',
      }),
    },
  ],
} as SQSEvent;

describe('Test catalog batch', () => {
  test('return 202', async () => {
    const result = await handler.catalogBatchProcess(sqsEvent);
    expect(result.statusCode).toEqual(StatusCodes.ACCEPTED);
  });
});
