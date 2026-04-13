import { Client } from "minio";
import dotenv from "dotenv";

dotenv.config();

const minioClient = new Client({
  endPoint: process.env.MINIO_HOST || "localhost",
  port: 9000,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY || "admin",
  secretKey: process.env.MINIO_SECRET_KEY || "password123",
});

export default minioClient;