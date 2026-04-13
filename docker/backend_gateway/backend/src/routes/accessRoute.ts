import fastify, { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import authController from "../controllers/authController.js";
import userSchema from "../schemas/userSchema.js";
import auth from "../plugins/VerifyToken.js";

const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post('/login', { schema: { body: userSchema.bodySchemaForLogin } },
        authController.login);
    fastify.get('/logout', { preHandler: auth }, authController.logout);
    fastify.post('/login/google', authController.googleLogin);
};

export default userRoutes;