import { FastifyReply, FastifyRequest } from "fastify";
import { IjoinRequest } from "../interfaces/groupInterface.js";
import prisma from "../lib/prisma.js";
import { StatusRequest } from "@prisma/client";
import { IlistWithPagination } from "../interfaces/queryStringInterface.js";
import axios from "axios";

const sendRequest = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected: string = request.headers['x-user-id'] as string ;
        const data = request.body as IjoinRequest;
        const url = process.env.USER_SERVICE_LIST || "https://user:3001/list/get" ;

        const response = await axios.post(url, {
            userIds: data.receiverId
        });
        if (response.data.users.length == 0)
            return reply.status(404).send({message: "User not found!"});
        const group = await prisma.groups.findFirst({
            where : {
                id: data.groupId
            }
        })
        if (!group)
            return reply.status(404).send({message: "Group not found!"});
        if (group.creatorId == data.receiverId)
            return reply.status(403).send({message: "The receiver is the admin of the group"});
        if (idUserConnected != group.creatorId)
            return reply.status(403).send({message: "Only the admin can do this action"});
        const joinRequest = await prisma.groupJoinRequests.findFirst({
            where : {
                receiverId : data.receiverId,
                groupId: data.groupId,
                status : {
                    notIn : [StatusRequest.DENIED]
                }
            }
        })
        if (joinRequest)
            return reply.status(403).send({message: "Request already exists!"});
        await prisma.groupJoinRequests.create({
            data : {
                receiverId : data.receiverId,
                groupId: data.groupId
            }
        })
        return reply.status(201).send({message: "Request send successfully!"});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const declineRequest = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected: string = request.headers['x-user-id'] as string;
        const {requestId} = request.params as { requestId: string};
        const joinRequest = await prisma.groupJoinRequests.findUnique({
            where:{
                id: requestId
            }
        })
        if (!joinRequest)
            return reply.status(404).send({message: "Request not found"});
        if (joinRequest.receiverId != idUserConnected)
            return reply.status(401).send({
                    message: "Unauthorized action: the current user is not the receiver"
                });
        if (joinRequest.status != StatusRequest.PENDING)
            return reply.status(500).send({ message: "Request already answered" });
        await prisma.groupJoinRequests.update({
            where: {
                id: requestId
            },
            data: {
                status: StatusRequest.DENIED
            }
        })
        return reply.status(201).send({message: "Request declined"});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const acceptRequest = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected: string = request.headers['x-user-id'] as string;
        const {requestId} = request.params as { requestId: string};
        const joinRequest = await prisma.groupJoinRequests.findUnique({
            where:{
                id: requestId
            }
        })
        if (!joinRequest)
            return reply.status(404).send({message: "Request not found"});
        if (joinRequest.receiverId != idUserConnected)
            return reply.status(401).send({
                    message: "Unauthorized action: the current user is not the receiver"
                });
        if (joinRequest.status != StatusRequest.PENDING)
            return reply.status(500).send({ message: "Request already answered" });
        await prisma.$transaction([
            prisma.groupJoinRequests.update({
                where: {
                    id: requestId
                },
                data: {
                    status: StatusRequest.ACCEPTED
                }
            }),
                /*************************
                 *      ADD MEMBER       *
                ****************************/
            prisma.groupMember.create({
                data: {
                    userId: idUserConnected,
                    groupId: joinRequest.groupId,
                    requestId: requestId
                }
            })
        ])
        // await prisma.groupJoinRequests.update({
        //     where: {
        //         id: requestId
        //     },
        //     data: {
        //         status: StatusRequest.ACCEPTED
        //     }
        // })
        // /*************************
        //  *      ADD MEMBER       *
        // ****************************/
        // await prisma.groupMember.create({
        //     data: {
        //         userId: idUserConnected,
        //         groupId: joinRequest.groupId
        //     }
        // })
        return reply.status(201).send({message: "Request accepted"});
    } catch (error) {
        // return reply.status(500).send({message: error.message});
        return reply.status(500).send({message: "Internal server error"});
    }
}

const countRequestReceived = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected: string = request.headers['x-user-id'] as string;
        const count = await prisma.groupJoinRequests.count({
            where: {
                receiverId: idUserConnected,
                status: StatusRequest.PENDING
            }
        })
        return reply.status(200).send({count});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const listRequestReceived = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        let  { page , count }   = request.query as IlistWithPagination;
        const idUserConnected: string = request.headers['x-user-id'] as string;
        page = (page == undefined ? 0 : page);
        count = (count == undefined ? 10 : count);
        const list = await prisma.groupJoinRequests.findMany({
            skip: page * count,
            take: count,
            where: {
                receiverId: idUserConnected,
                status: StatusRequest.PENDING
            },
            include: {
                group: true
            }
        })
        return reply.status(200).send({ list });
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const groupJoinRequestController = {
    sendRequest,
    declineRequest,
    acceptRequest,
    countRequestReceived,
    listRequestReceived
}

export default groupJoinRequestController;
