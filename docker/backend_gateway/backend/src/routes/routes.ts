import { FastifyPluginAsync } from 'fastify';
import userRoutes from './accessRoute.js';
import authRoutes from './authRoutes.js';

const routes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.register(userRoutes, { prefix : '/user'});
  fastify.register(authRoutes, { prefix : '/auth'});
};

export default routes;