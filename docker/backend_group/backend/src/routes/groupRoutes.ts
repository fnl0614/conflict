import { FastifyInstance, FastifyPluginAsync } from "fastify";
import groupSchema from "../schemas/groupSchema.js";
import groupController from "../controllers/groupController.js";
import validatorSchema from "../schemas/validatorSchema.js";

const groupRoutes: FastifyPluginAsync = async (fastify:FastifyInstance) => {
    fastify.post('/create', { schema: { body: groupSchema.groupCreationSchema } },
        groupController.createGroup);
    fastify.put('/update/:groupId', { schema: { 
            params: groupSchema.groupIdSchema,
            body: groupSchema.groupUpdateSchema 
        } },
        groupController.updateGroup);
    fastify.delete('/delete/:groupId', { schema: { 
            params: groupSchema.groupIdSchema
        }},
        groupController.deleteGroup);
    fastify.get('/list/mygroup', { schema: {
            querystring: validatorSchema.listWithPagination
        }},
        groupController.listMygroups);
    fastify.get('/profile/:groupId', { schema: {
            params: groupSchema.groupIdSchema
        }},
        groupController.profileGroup);
}

export default groupRoutes;