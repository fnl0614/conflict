import {
    FastifyInstance,
    FastifyPluginAsync
} from "fastify";
import friendsRoutes from "./friendsRoutes.js";
import friendsRequestsRoutes from "./friendsRequestsRoutes.js";
import userController, { UpdatePasswordRequest } from "../controllers/userController.js";
import userSchema from "../schemas/userSchema.js";

const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {

  fastify.register(friendsRoutes, { prefix : '/friends/'});
  fastify.register(friendsRequestsRoutes, { prefix : '/friends/requests'});
  fastify.post('/login', { schema: { body: userSchema.bodySchemaForLogin } },
    userController.userLogin);
  fastify.post('/access/google', userController.googleAccess);

  fastify.get("/myProfile"  ,userController.getMyProfile);
  fastify.get("/profile/:id"  ,userController.getProfile);
  fastify.delete("/removeUser/:username", userController.removeUser);
  fastify.get("/logout", userController.userLogout);
  fastify.get("/listUsers", userController.listUsers);
  fastify.post("/list/get",{schema : { 
    body: userSchema.listUserSchema
  }}, userController.listUsersFromId);
  fastify.get("/findUser/:UserInfo", userController.findUsers);
  fastify.post('/register', { schema: { body: userSchema.bodySchemaForRegistration } },
    userController.userRegistration);
  fastify.put('/update' ,userController.userUpdate);
  fastify.put('/update/image/:type' ,userController.userUpdateProfileImage);
  fastify.put<{Body: UpdatePasswordRequest}>('/updatePassword', userController.userUpdatePassword);
};

export default userRoutes;
