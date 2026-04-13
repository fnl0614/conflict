import {
    FastifyInstance,
    FastifyPluginAsync
} from "fastify";
import postController from "../controllers/postController.js";
import getPostController from "../controllers/getPost.js";

const postRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.get('/getPost/:id', getPostController.getPost);
    fastify.get('/getAllFriendsPosts', getPostController.getAllPosts); // acceuil
    fastify.get('/getUserPosts/:target_id', getPostController.getUserPosts);
    fastify.get('/getAllUserPosts', getPostController.getAllUserPosts);
    fastify.get('/getAllGroupPosts/:GroupId', getPostController.getAllGroupPosts);// order by date desc
    fastify.post('/createPost', postController.createPost);
    fastify.delete('/deletePost/:id', postController.deletePost);
    fastify.put('/updatePost/:id', postController.updatePost);
    fastify.put('/likePost/:id', postController.likePost);

};

export default postRoutes;