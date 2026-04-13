import rateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.register(rateLimit, {
    max: 10,
    timeWindow: "1 minute",
  });
}
