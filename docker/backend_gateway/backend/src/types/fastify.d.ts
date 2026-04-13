import { FastifyReply, FastifyRequest } from "fastify";
import { Server as SocketIOServer } from "socket.io";
import "@fastify/session";

declare module "fastify" {
  interface FastifyInstance {
    authToken: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    io: SocketIOServer;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: {
      getAccessTokenFromAuthorizationCodeFlow(req: any): Promise<any>;
      getProfile(token: any): Promise<any>;
      authorizationCodeGrantFlow(request: FastifyRequest, reply: FastifyReply): Promise<any>;
      generateAuthorizationUri(request: FastifyRequest, reply: FastifyReply): Promise<any>;
      // tu peux ajouter d'autres méthodes si nécessaire
    }
  }
}

declare module "@fastify/session" {
  interface SessionData {
    oauthState?: string;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    secret: { id: string }   // ce que contient ton JWT
    user: { id: string }      // ce que request.user retournera
  }
}