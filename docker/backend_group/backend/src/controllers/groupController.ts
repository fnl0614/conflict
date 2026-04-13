import dotenv from 'dotenv'
import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma.js';
import { IgroupData } from '../interfaces/groupInterface.js';
import { IlistWithPagination } from '../interfaces/queryStringInterface.js';
import { RoleInGroup } from '@prisma/client';

dotenv.config();

const createGroup = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected: string = request.headers['x-user-id'] as string;
        const data = request.body as IgroupData;
        const newGroup = await prisma.groups.create({
            data: {
                creatorId: idUserConnected,
                name: data.name,
                description: data.description,
                urlProfil: data.urlProfil ? data.urlProfil : null,
                urlCover: data.urlCover ? data.urlCover : null,
            }
        })
        if (newGroup)
        {
            /**************************************/
            /***************ADD MEMBER*************/
            /**************************************/
            await prisma.groupMember.create({
                data: {
                    groupId: newGroup.id,
                    userId: idUserConnected,
                    role: RoleInGroup.ADMIN
                }
            })
            return reply.status(201).send({message: "Group created successfully!"});
        }
        else
            throw new Error("Internal server error");
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const updateGroup = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected: string = request.headers['x-user-id'] as string;
        const { groupId } = request.params as { groupId : string };
        const data = request.body as IgroupData;
        const group = await prisma.groups.findUnique({
            where: {
                id : groupId
            }
        })
        if (!group)
            return reply.status(404).send({message: "Group not found"});
        if (idUserConnected != group.creatorId)
            return reply.status(404).send({
                message: "Unauthorized action: this user is not the creator"
            });
        await prisma.groups.update({
            where: {
                id: groupId
            },
            data: {
                name : data.name ? data.name : group.name ,
                description : data.description ? data.description : group.description,
                urlProfil : data.urlProfil ? data.urlProfil : group.urlProfil,
                urlCover : data.urlCover ? data.urlCover : group.urlCover
            }
        })
        return reply.status(200).send({message: "Group updated successfully!"});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const deleteGroup = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected: string = request.headers['x-user-id'] as string;
        const { groupId } = request.params as {groupId : string};
        const group = await prisma.groups.findFirst ({
            where: {
                id : groupId
            },
        })
        if (!group)
            return reply.status(404).send({message: "Group not found"});
        if (group.creatorId != idUserConnected)
            return reply.status(401).send({
                message: "Unauthorized action: this user is not the creator"
            });
        await prisma.groups.delete({
            where: {
                id: groupId
            }
        })
        return reply.status(200).send({message: "Group deleted successfully!"});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const listMygroups = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        let  { page , count }   = request.query as IlistWithPagination;
        const idUserConnected = request.headers['x-user-id'] as string;
        page = (page == undefined ? 0 : page);
        count = (count == undefined ? 10 : count);
        const list = await prisma.groups.findMany ({
            skip: page * count,
            take: count,
            where: {
                creatorId : idUserConnected
            }
        })
        return reply.status(200).send({ list });
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const searchGroups = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        let  { page , count }   = request.query as IlistWithPagination;
        page = (page == undefined ? 0 : page);
        count = (count == undefined ? 10 : count);
        const { nameGroup } =request.body as { nameGroup: string };
        const groups = await prisma.groups.findMany ({
            skip: page * count,
            take: count,
            where: {
                name : {
                    contains: nameGroup
                }
            }
        })
        return reply.status(200).send({groups});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}

const profileGroup = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const idUserConnected: string = request.headers['x-user-id'] as string;
        const { groupId } = request.params as {groupId : string};
        const group = await prisma.groupMember.findFirst ({
            where: {
                groupId : groupId,
                userId : idUserConnected
            },
            select : {
                group : true,
                role : true
            }
        })
        if (!group)
            return reply.status(404).send({message: "Group not found or user not Member"});
        return reply.status(200).send({group});
    } catch (error) {
        return reply.status(500).send({message: "Internal server error"});
    }
}


const groupController = {
    createGroup,
    updateGroup,
    deleteGroup,
    listMygroups,
    searchGroups,
    profileGroup
}

export default groupController;