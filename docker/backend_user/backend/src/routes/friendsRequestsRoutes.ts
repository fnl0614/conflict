import fastify, { FastifyPluginAsync } from "fastify";
import validatorSchema from "../schemas/validatorSchema.js";
import friendsRequestsController from "../controllers/friendsRequestsController.js";
import userSchema from "../schemas/userSchema.js";

const friendsRequestsRoutes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post('/send', {
    schema: {body: validatorSchema.sendFriendRequestBody}
  }, friendsRequestsController.createFriendRequest);
  fastify.put('/accept/:id', {
      schema: {params: validatorSchema.idOnly}
    }, friendsRequestsController.acceptFriendRequest);
  fastify.put('/deny/:id', {
      schema: {params: validatorSchema.idOnly}
    }, friendsRequestsController.denyFriendRequest);
  fastify.delete('/cancel/:id', {
      schema: {params: validatorSchema.idOnly}
    }, friendsRequestsController.cancelFriendRequest);
  fastify.get('/list/received', {
      schema: {querystring: validatorSchema.listWithPagination}
    }, friendsRequestsController.listFriendsRequestsReceived);
  fastify.get('/list/sent', {
      schema: {querystring: validatorSchema.listWithPagination}
    }, friendsRequestsController.listFriendsRequestsSent);
  fastify.get('/received/count/:idUser',  {
    schema: {  
      params: userSchema.idSchema
    }
  }, friendsRequestsController.countFriendsRequestsReceived);
};

export default friendsRequestsRoutes;