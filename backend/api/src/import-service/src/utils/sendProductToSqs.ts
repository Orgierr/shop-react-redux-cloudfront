import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
export const sendProductToSqs = (products: Product[]) => {
  const sqsClient = new SQSClient({ region: process.env.REGION });
  products.forEach(async (product) => {
    const command = new SendMessageCommand({
      MessageBody: JSON.stringify(product),
      QueueUrl: process.env.SQS_URL,
    });
    await sqsClient.send(command);
  });
};
