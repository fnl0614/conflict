import {
    FastifyInstance,
    FastifyPluginAsync
} from "fastify";
import userController from "../controllers/uploadController.js";

const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {

  fastify.post('/upload/:type', userController.uploadFile); // pdp-pdc-post
  fastify.delete('/delete/:type', userController.deleteFile); // pdp-pdc-post //
};
  
export default userRoutes;