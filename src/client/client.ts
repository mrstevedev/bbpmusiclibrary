import { S3Client } from "@aws-sdk/client-s3";

export const S3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
});

export const params = {
  Region: process.env.AWS_REGION as string,
  Bucket: process.env.AWS_S3_BUCKET as string,
};
