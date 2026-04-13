import { FastifyRequest, FastifyReply } from 'fastify';
import publicBucket from '../conf/publicBucket.js';
import minioClient from '../lib/minoClient.js';
import { REPL_MODE_STRICT } from 'repl';

const uploadFile = async (request: FastifyRequest, reply: FastifyReply) => {
  const id = request.headers['x-user-id'] as string;
  const res = request.params;

  if (!res) {
    return reply
      .status(400)
      .send({ message: "Type parameter not found in URL!" });
  }

  const type = res ? (res as any).type : null;

  if (!type || !['pdp', 'pdc', 'post'].includes(type)) {
    return reply
      .status(400)
      .send({
        message: "uploadFile: Invalid type! Must be 'pdp', 'pdc', or 'post'"
      });
  }

  await publicBucket(minioClient, type);

  if (!id) {
    return reply
      .status(400)
      .send({
        message: "User ID not found in headers!"
      });
  }

  const data = await request.file() as any;
  if (!data) {
    return reply
      .status(400)
      .send({
        message: "No file uploaded!"
      });
  }

  const { filename, mimetype, file } = data;

  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
    return reply
      .status(406)
      .send({
        message: "Invalid file type! Allowed: jpeg, jpg, png, webp"
      });
  }

  const MAX_SIZE = 10 * 1024 * 1024;
  const chunks: Buffer[] = [];
  let totalSize = 0;

  for await (const chunk of file) {
    totalSize += chunk.length;
    if (totalSize > MAX_SIZE) {
      return reply
        .status(400)
        .send({
          message: "File too large! Maximum size is 10MB"
        });
    }
    chunks.push(chunk);
  }

  const fileBuffer = Buffer.concat(chunks);
  const objectName = `${type}/${id}/${Date.now()}/${filename}`;

  try {
    const result = await minioClient.putObject(type, objectName, fileBuffer, mimetype);
    if (result) {
      return reply
        .status(200)
        .send({ path: `${type}/${objectName}` });
    } else {
      return reply
        .status(500)
        .send({ error: "File upload failed." });
    }
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Error uploading file ", error });
  }
}

const deleteFile = async (request: FastifyRequest, reply: FastifyReply) => {
  const id = request.headers['x-user-id'] as string;
  const res = request.params; // 'pdp' ou 'pdc' ou 'post'

  if (!id) {
    return reply
      .status(400)
      .send(
        {
          message: "User ID not found in headers!"
        });
  }
  if (!res) {
    return reply
      .status(400)
      .send(
        {
          message: "Type parameter not found in URL!"
        });
  }
  const type = res ? (res as any).type : null;
  if (!type || !['pdp', 'pdc', 'post'].includes(type)) {
    return reply
      .status(400)
      .send(
        {
          message: "URL not provided in request body!"
        });
  }
  const targeturl = (request.query as { path: string })?.path || null;
  if (!targeturl) {
    return reply
      .status(400)
      .send({
        message: "path required for delete post"
      })
  }
  const parts = targeturl.split('/');
  const file = parts.slice(-2).join('/');
  if (!file) {
    return reply
      .status(400)
      .send(
        {
          message: "File name not provided in request body!"
        });
  }
  try {
    await minioClient.removeObject(type, parts.slice(1).join('/'));
    return reply
      .status(200)
      .send(
        {
          message: "Files deleted successfully"
        });
  } catch (error) {
    console.error("Error deleting files:", error);
    return reply
      .status(500)
      .send({
        message: "Error deleting files"
      });
  }
}

const uploadController = {
  uploadFile,
  deleteFile
};

export default uploadController;