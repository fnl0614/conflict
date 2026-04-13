import fastify, { FastifyInstance, FastifyPluginAsync } from "fastify";
import groupSchema from "../schemas/groupSchema.js";
import groupMemberController from "../controllers/groupMemberController.js";
import validatorSchema from "../schemas/validatorSchema.js";

const groupMemberRoutes: FastifyPluginAsync = async (fastify:FastifyInstance) => {
    fastify.post('/delete/member', { schema: { 
            body: groupSchema.groupIdAndUserIdSchema 
        } }, groupMemberController.deleteMember);
    fastify.delete('/leave/:groupId', { schema: { 
            params: groupSchema.groupIdSchema
        } }, groupMemberController.leaveGroup);
    fastify.get('/list/member/:groupId', { schema: {
            params: groupSchema.groupIdSchema,
            querystring: validatorSchema.listWithPagination
        }},
        groupMemberController.listMember);
    fastify.get('/list/group/:userId', { schema: {
        params: validatorSchema.userId,
        querystring: validatorSchema.listWithPagination
    }},
    groupMemberController.listGroup);
    fastify.get('/list/allGroup/:userId', { schema: {
        params: validatorSchema.userId,
        querystring: validatorSchema.listWithPagination
    }},
    groupMemberController.listAllGroup);
    fastify.get('/relation/:groupId', { schema: {
        params: groupSchema.groupIdSchema
    }}, groupMemberController.checkMember);
}

export default groupMemberRoutes;