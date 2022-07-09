import { SQSEvent } from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { ProductRepository } from '../repository/productRepositoy';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';

export const catalogBatchProcess = async (event: SQSEvent) => {
  console.log(event);
  const snsClient = new SNSClient({ region: process.env.REGION });

  for (const record of event.Records) {
    let product = JSON.parse(record.body) as Product;
    product.id = uuidv4();

    await ProductRepository.create(product);
    const command = new PublishCommand({
      Subject: 'Product created',
      Message: JSON.stringify(product),
      TopicArn: process.env.SNS_ARN,
      MessageAttributes: {
        price: {
          DataType: 'Number',
          StringValue: String(product.price),
        },
      },
    });
    await snsClient.send(command);
  }
  return { statusCode: StatusCodes.ACCEPTED };
};
