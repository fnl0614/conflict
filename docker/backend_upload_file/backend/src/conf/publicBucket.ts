import { Client } from "minio";

const publicBucket = async (minioClient: Client, bucketName: string) => {
  try {
    const bucketExists = await minioClient.bucketExists(bucketName);

    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
    }

    const publicPolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
      ],
    };

    await minioClient.setBucketPolicy(
      bucketName,
      JSON.stringify(publicPolicy)
    );

  } catch (error) {
    console.error("Error setting up public bucket:", error);
  }
};

export default publicBucket;