import fastify, { FastifyInstance, FastifyPluginAsync } from "fastify";
import groupController from "../controllers/groupController.js";
import validatorSchema from "../schemas/validatorSchema.js";
import groupJoinRequestController from "../controllers/groupJoinRequestController.js";
import requestSchema from "../schemas/requestSchema.js";

const groupJoinRequestRoutes: FastifyPluginAsync = async (fastify:FastifyInstance) => {
    fastify.post('/send', { schema: { body: requestSchema.joinRequestSchema } },
        groupJoinRequestController.sendRequest);
    fastify.put('/decline/:requestId', { schema: { 
            params: requestSchema.requestIdSchema
        } },
        groupJoinRequestController.declineRequest);
    fastify.put('/accept/:requestId', { schema: { 
            params: requestSchema.requestIdSchema
        }},
        groupJoinRequestController.acceptRequest);
    fastify.get('/count/request', groupJoinRequestController.countRequestReceived);
    fastify.get('/list/request', { schema: {
        querystring: validatorSchema.listWithPagination
    }}, groupJoinRequestController.listRequestReceived);
}

export default groupJoinRequestRoutes;