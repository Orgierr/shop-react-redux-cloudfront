import {
  CopyObjectCommandInput,
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';
import { s3Client } from './s3Client';

export const moveS3Object = async (bucketName: string, key: string) => {
  const copyConfig: CopyObjectCommandInput = {
    Bucket: bucketName,
    Key: `parsed/${key.split('uploaded/')[1]}`,
    CopySource: `${bucketName}/${key}`,
  };
  const copyCommand = new CopyObjectCommand(copyConfig);
  await s3Client.send(copyCommand);

  const deleteConfig: DeleteObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
  };
  const deleteCommand = new DeleteObjectCommand(deleteConfig);
  await s3Client.send(deleteCommand);
};
