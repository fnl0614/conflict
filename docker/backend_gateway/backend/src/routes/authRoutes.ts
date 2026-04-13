import fastify, { FastifyPluginAsync } from "fastify";
import userController from "../controllers/authController.js";
import auth from "../plugins/VerifyToken.js";

const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
//   fastify.get("/tokenizer", { preHandler: auth }, userController.tokenizer);
//   fastify.get("/debug-cookies", { preHandler: auth }, userController.debug_cookies);
  fastify.get("/refreshToken", userController.refreshToken);
};

export default authRoutes;