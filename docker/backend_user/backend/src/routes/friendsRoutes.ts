import fastify, { FastifyPluginAsync } from "fastify";
import friendsController from "../controllers/friendsController.js";
import queryStringSchema from "../schemas/validatorSchema.js";
import userSchema from "../schemas/userSchema.js";


const friendsRoutes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.delete('/delete',  {
      schema: { querystring: queryStringSchema.idFriend },
    }, friendsController.removefriend);
  fastify.get('/list/myFriends',  {
      schema: { querystring: queryStringSchema.listWithPagination },
    }, friendsController.listMyFriends);
  fastify.get('/list/friends/:idUser',  {
    schema: {  
      params: userSchema.idSchema , 
      querystring: queryStringSchema.listWithPagination
    },
    }, friendsController.listFriends);
  fastify.get('/list/notFriends', {
      schema: { querystring: queryStringSchema.listWithPagination },
    }, friendsController.listNotFriends);
  fastify.get('/count/:idUser',  {
    schema: {  
      params: userSchema.idSchema
    }
  }, friendsController.countFriends);
  fastify.get('/relation/:idUser',  {
    schema: {
      params: userSchema.idSchema
    }
  }, friendsController.relationFriend);
};

export default friendsRoutes;