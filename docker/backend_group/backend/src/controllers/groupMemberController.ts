import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../lib/prisma.js";
import { IlistWithPagination } from "../interfaces/queryStringInterface.js";
import { IUserIdAndGroupId } from "../interfaces/groupInterface.js";
import { RoleInGroup } from "@prisma/client";
import axios from "axios";

const listMember = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        let  { page , count }   = request.query as IlistWithPagination;
        page = (page == undefined ? 0 : page);
        count = (count == undefined ? 10 : count);
        const { groupId } = request.params as { groupId: string };
        let groups = await prisma.groupMember.findMany ({
            skip: page * count,
            take: count,
            where: {
               groupId : groupId
            },
            select:
            {
                userId: true
            }
        })
        if (!groups)
            return  reply.status(200).send({groups});

        const ids = groups.map(group => group.userId );
        const url = process.env.USER_SERVICE_LIST || "https://user:3001/list/get" ;

        const response = await axios.post(url, {
            userIds: ids
        });
        return reply.status(response.status).send(response.data);
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const listGroup = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        let  { page , count }   = request.query as IlistWithPagination;
        page = (page == undefined ? 0 : page);
        count = (count == undefined ? 10 : count);
        const { userId } = request.params as { userId:string };
        let list = await prisma.groupMember.findMany ({
            skip: page * count,
            take: count,
            where: {
                userId : userId,
                role: RoleInGroup.MEMBER
            },
            select: {
                group: {
                   select : {
                        id:true,
                        name: true,
                        urlProfil: true
                   }
                }
            }
        })
        return  reply.status(200).send({list});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const listAllGroup = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        let  { page , count }   = request.query as IlistWithPagination;
        page = (page == undefined ? 0 : page);
        count = (count == undefined ? 10 : count);
        const { userId } = request.params as { userId:string };
        let list = await prisma.groupMember.findMany ({
            skip: page * count,
            take: count,
            where: {
                userId : userId
            },
            select: {
                group: {
                   select : {
                        id:true,
                        name: true,
                        urlProfil: true
                   }
                }
            }
        })
        return  reply.status(200).send({list});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const deleteMember = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected = request.headers['x-user-id'] as string;
        const data = request.body as IUserIdAndGroupId;

        if (!idUserConnected)
          return reply.status(401).send({ message: "Unauthorized" });

        const groupMember = await prisma.groupMember.findFirst({
            where : {
                groupId: data.groupId,
                userId: data.userId
            }
        })
        const groupAdmin = await prisma.groupMember.findFirst({
            where : {
                groupId: data.groupId,
                userId: idUserConnected
            }
        })
        if (!groupMember)
            return reply.status(404).send({message: "the relation member/group not Found!"});
        if (groupAdmin?.role != RoleInGroup.ADMIN)
            return reply.status(401).send({
                message: "Unauthorized action: this user is not the creator!"
            });
        if (groupMember?.role == RoleInGroup.ADMIN || !groupMember.requestId)
            return reply.status(401).send({
                message: "Unauthorized action: can't remove admin!"
            });
        await prisma.$transaction([
            prisma.groupMember.delete({
                where : {
                    id: groupMember.id
                }
            }),
            prisma.groupJoinRequests.delete({
                where : {
                    id: groupMember.requestId
                }
            })
        ])
       return reply.status(201).send({message: "Member deleted successfully!"});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const leaveGroup = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected = request.headers['x-user-id'] as string;
        const { groupId } = request.params as { groupId : string };

        if (!idUserConnected)
          return reply.status(401).send({ message: "Unauthorized" });

        const groupMember = await prisma.groupMember.findFirst({
            where : {
                groupId: groupId,
                userId: idUserConnected
            }
        })
        if (!groupMember)
            return reply.status(404).send({message: "the relation member/group not Found!"});
        if (groupMember?.role == RoleInGroup.ADMIN || !groupMember.requestId)
            return reply.status(401).send({
                message: "Unauthorized action: can't remove admin!"
            });
        await prisma.$transaction([
            prisma.groupMember.delete({
                where : {
                    id: groupMember.id
                }
            }),
            prisma.groupJoinRequests.delete({
                where : {
                    id: groupMember.requestId
                }
            })
        ])
       return reply.status(201).send({message: "Member left the group successfully!"});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const checkMember = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected = request.headers['x-user-id'] as string;
        const { idGroup } = request.params as { idGroup: string };
        let member : boolean = await prisma.groupMember.findFirst ({
            where: {
               groupId : idGroup,
               userId : idUserConnected
            }
        }) ? true : false;
        return  reply.status(200).send({member});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const groupMemberController = {
    listMember,
    listGroup,
    listAllGroup,
    deleteMember,
    leaveGroup,
    checkMember
}

export default groupMemberController;