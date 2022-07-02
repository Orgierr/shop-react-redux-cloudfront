import { S3Event } from 'aws-lambda';
import { parseS3Object } from '../utils/parseS3Object';
import { StatusCodes } from 'http-status-codes';
import { moveS3Object } from '../utils/moveS3Object';

export const importFileParser = async (event: S3Event) => {
  console.log(event);

  const bucketName = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' '),
  );

  console.log(await parseS3Object(bucketName, key));
  await moveS3Object(bucketName, key);

  return { statusCode: StatusCodes.ACCEPTED };
};
