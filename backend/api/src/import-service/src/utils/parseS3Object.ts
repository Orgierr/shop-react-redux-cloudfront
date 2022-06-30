import { GetObjectCommandInput, GetObjectCommand } from '@aws-sdk/client-s3';
import { ReadStream } from 'fs';
import { s3Client } from './s3Client';
import csv from 'csv-parser';

export const parseS3Object = async (bucketName: string, key: string) => {
  const params: GetObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
  };
  const results = [];
  const command = new GetObjectCommand(params);
  const file = await s3Client.send(command);

  const readStream = file.Body as ReadStream;
  return new Promise((res, rej) => {
    readStream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        res(results);
      });
  });
};
