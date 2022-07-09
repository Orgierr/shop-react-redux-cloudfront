import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from './s3Client';

export const s3UploadUrl = async (fileName: string): Promise<string> => {
  const bucketParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: `uploaded/${fileName}`,
    ContentType: 'application/octet-stream',
  };

  const command = new PutObjectCommand(bucketParams);

  return await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
};
