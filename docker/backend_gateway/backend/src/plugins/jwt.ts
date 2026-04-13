import jwt from "@fastify/jwt";
import dotenv from "dotenv"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

dotenv.config()

class JWT_auth {
  private static secrets = process.env.JWT_SECRET;

  private static register(fastify: FastifyInstance) {
    fastify.register(jwt, {
      secret: JWT_auth.secrets || "supersecret",
    });
  }
  
  public static init(fastify: FastifyInstance) {
    JWT_auth.register(fastify);
  }

  public static getSecret() {
    return JWT_auth.secrets;
  }
}

export default JWT_auth;