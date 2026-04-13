import fp from "fastify-plugin";
import { Server as SocketIOServer } from "socket.io";
import { FastifyInstance } from "fastify"
import http from "http"

export default fp(async (fastify: FastifyInstance) => {
  const httpServer = fastify.server as http.Server;

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  });

  fastify.decorate("io", io);
});