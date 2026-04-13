import { FriendRequests, StatusRequest } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../lib/prisma.js";
import { IlistWithPagination } from "../interfaces/queryStringInterface.js";
import console from "node:console";

const createFriendRequest = async (request: FastifyRequest, reply: FastifyReply) => {
  const friendRequest: FriendRequests = request.body as FriendRequests;
  const idUserConnected: string = request.headers['x-user-id'] as string;
  
  if (idUserConnected == friendRequest.receiverId)
    return reply.status(401).send({
        message: "Unauthorized action: the sender and the receiver must be different users"
      });
  try {
    const receiver = await prisma.users.findUnique({
      where: {
        id:  friendRequest.receiverId,
      }
    })
    if (!receiver)
      return reply.status(404).send({ message: "Receiver user of friend request not found"});
    const friendRequestSended = await prisma.friendRequests.findFirst({
      where : {
        OR:
        [{ 
          senderId: idUserConnected,
          receiverId: friendRequest.receiverId,
          NOT: {
          status: StatusRequest.DENIED
          }
        },
        { 
          senderId: friendRequest.receiverId,
          receiverId: idUserConnected,
          NOT: {
          status: StatusRequest.DENIED
          }
        }]
      }
    })
    if (friendRequestSended)
      return reply.status(500).send({ message: "Friend Request already exist" });
    const friendRequested = await prisma.friendRequests.create({
      data : {
        senderId: idUserConnected,
        receiverId: friendRequest.receiverId
      }
    })
    return reply.status(201).send({ message: "Friend Request send successfully!" });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

const acceptFriendRequest = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id }  = request.params as { id: string};
    const idUserConnected = request.headers['x-user-id'] as string;
    const friendRequest = await prisma.friendRequests.findUnique({
      where : {
        id: id
      }
    })
    if (!friendRequest)
      return reply.status(404).send({ message: "Friend Request not found" });
    if (friendRequest.receiverId != idUserConnected)
      return reply.status(401).send({ message: "Unauthorized action" });
    if (friendRequest.status != StatusRequest.PENDING)
      return reply.status(500).send({ message: "Friend Request already answered" });

    await prisma.friendRequests.update({
      where: {
        id: id
      },
      data: {
        status: StatusRequest.ACCEPTED
      }
    })
    await prisma.friends.create({
      data: {
        userId1: friendRequest.senderId,
        userId2: friendRequest.receiverId,
        friendRequestId: id
      }
    })
    return reply.status(200).send({ message: "Friend Request accepted!" });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

const denyFriendRequest = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id }  = request.params as { id: string};
    const idUserConnected = request.headers['x-user-id'] as string;
    const friendRequest = await prisma.friendRequests.findUnique({
      where : {
        id: id
      }
    })
    if (!friendRequest) 
      return reply.status(404).send({ message: "Friend Request not found" });
    if (friendRequest.receiverId != idUserConnected)
      return reply.status(401).send({ message: "Unauthorized action" });
    if (friendRequest.status != StatusRequest.PENDING)
      return reply.status(500).send({ message: "Friend Request already answered" });
    await prisma.friendRequests.update({
      where: {
        id: id
      },
      data: {
        status: StatusRequest.DENIED
      }
    })
    return reply.status(200).send({ message: "Friend Request denied!" });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

const cancelFriendRequest = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id }  = request.params as { id: string};
    const idUserConnected = request.headers['x-user-id'] as string;
    const friendRequest = await prisma.friendRequests.findUnique({
      where : {
        id: id
      }
    })
    if (!friendRequest)
      return reply.status(404).send({ message: "Friend Request not found" });
    if (friendRequest.senderId != idUserConnected)
        return reply.status(401).send({ message: "Unauthorized action" });
    if (friendRequest.status != StatusRequest.PENDING)
      return reply.status(500).send({ message: "Friend Request already answered" });
    await prisma.friendRequests.delete({
      where: {
        id: id
      }
    })
    return reply.status(200).send({ message: "Friend Request deleted!" });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

const listFriendsRequestsReceived = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    let  { page , count }   = request.query as IlistWithPagination;
    const idUserConnected = request.headers['x-user-id'] as string;
    page = (page == undefined ? 0 : page);
    count = (count == undefined ? 10 : count);
    const friendRequests = await prisma.friendRequests.findMany({
      skip: page * count,
      take: count,
      where : {
        receiverId: idUserConnected,
        status: StatusRequest.PENDING
      },
      orderBy : {
        createdAt : 'desc'
      },
      select: {
        id: true,
        sender: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
            email: true,
            urlProfil: true,
            status: true
          }
        }
      }
    })
    return reply.status(200).send({ friendRequests });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}


const listFriendsRequestsSent = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    let  { page , count }   = request.query as IlistWithPagination;
    const idUserConnected = request.headers['x-user-id'] as string;
    page = (page == undefined ? 0 : page);
    count = (count == undefined ? 10 : count);
    const friendRequests = await prisma.friendRequests.findMany({
      skip: page * count,
      take: count,
      where : {
        senderId: idUserConnected,
        status: StatusRequest.PENDING
      },
      orderBy : {
        createdAt : 'desc'
      }
    })
    return reply.status(200).send({ friendRequests });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

const countFriendsRequestsReceived = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { idUser } = request.params as {idUser : string};
    const count = await prisma.friendRequests.count({
      where : {
        receiverId: idUser,
        status: StatusRequest.PENDING
      }
    })
    return reply.status(200).send({ count });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}


const friendsRequestsController = {
  createFriendRequest,
  acceptFriendRequest,
  denyFriendRequest,
  cancelFriendRequest,
  listFriendsRequestsReceived,
  listFriendsRequestsSent,
  countFriendsRequestsReceived
}

export default friendsRequestsController;