import { FastifyReply, FastifyRequest } from "fastify";
import { IidFriendsQuery, IlistWithPagination } from "../interfaces/queryStringInterface.js";
import prisma from "../lib/prisma.js";
import { StatusRequest } from "@prisma/client";

const removefriend = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
      const  { idFriend }   = request.query as IidFriendsQuery;
      const idUserConnected = request.headers['x-user-id'] as string;
      const friend = await prisma.friends.findFirst({
        where : {
          OR : [
            { userId1 : idUserConnected, userId2 : idFriend },
            { userId1 : idFriend, userId2 : idUserConnected }
          ]
        }
      })
      if (!friend) 
        return reply.status(404).send({ message: "Friend not found" });
      await prisma.friendRequests.delete({ where: { id : friend.friendRequestId } });
      // await prisma.friends.delete({ where: { id : friend.id } });
      return reply.status(200).send({ message: "Friend removed" });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
}

const listMyFriends = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
      let  { page , count }  = request.query as IlistWithPagination;
      const idUserConnected = request.headers['x-user-id'] as string;
      page = (page == undefined ? 0 : page);
      count = (count == undefined ? 10 : count);
      const friends = await prisma.friends.findMany({
        skip: page * count,
        take: count,
        where : {
          OR : [
              { userId1: idUserConnected },
              { userId2: idUserConnected } 
          ]
        },
        orderBy :{
          createdAt : 'desc'
        },
        select:{
          user1 : {
            select : {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              status: true,
              urlProfil: true,
              urlCover: true
            }
          },
          user2 : {
            select : {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              status: true,
              urlProfil: true,
              urlCover: true
            }
          },
  
        }
      })
      const friendsList = friends.map(friend => friend.user1.id == idUserConnected ? friend.user2 : friend.user1)
      return reply.status(200).send({ friendsList });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
}

const listFriends = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
      let  { page , count }  = request.query as IlistWithPagination;
      const { idUser } = request.params as {idUser : string};
      page = (page == undefined ? 0 : page);
      count = (count == undefined ? 10 : count);
      const friends = await prisma.friends.findMany({
        skip: page * count,
        take: count,
        where : {
          OR : [
              { userId1: idUser },
              { userId2: idUser }
          ]
        },
        orderBy :{
          createdAt : 'desc'
        },
        select:{
          user1 : {
            select : {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              status: true,
              urlProfil: true,
              urlCover: true
            }
          },
          user2 : {
            select : {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              status: true,
              urlProfil: true,
              urlCover: true
            }
          },
  
        }
      })
      const friendsList = friends.map(friend => friend.user1.id == idUser ? friend.user2 : friend.user1)
      return reply.status(200).send({ friendsList });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
}

const listNotFriends = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
      let  { page , count }   = request.query as IlistWithPagination;
      const idUserConnected = request.headers['x-user-id'] as string;
      page = (page == undefined ? 0 : page);
      count = (count == undefined ? 10 : count);

      const potentialFriends = await prisma.friendRequests.findMany({
        where : {
          OR : [
              { senderId: idUserConnected },
              { receiverId: idUserConnected } 
          ],
          NOT: {
            status : StatusRequest.DENIED
          }
        },
        select:{
          senderId : true,
          receiverId : true
          },
      })

      const friendsListId = potentialFriends.map(friend => 
          friend.senderId == idUserConnected ? 
            friend.receiverId : friend.senderId)
      const notFriends = await prisma.users.findMany({
        skip: page * count,
        take: count,
          where: {
            id:{
              notIn: [...friendsListId, idUserConnected]
            } 
          },
          select : {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true,
            urlProfil: true,
            urlCover: true
           }
      });
      // const notFriends = await prisma.$queryRaw`SELECT * FROM User NOT IN ( SELECT user1Id,  )`;
      return reply.status(200).send({ notFriends });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
}

const countFriends = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { idUser } = request.params as {idUser : string};
      const count = await prisma.friends.count({
        where : {
          OR : [
              { userId1: idUser },
              { userId2: idUser } 
          ]
        }
      })
      return reply.status(200).send({ count });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
}

const relationFriend = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { idUser } = request.params as {idUser : string};
    const idUserConnected = request.headers['x-user-id'] as string;
    const friend : boolean = await prisma.friends.count({
        where : {
          OR : [
            { userId1: idUserConnected , userId2: idUser } ,
              { userId1: idUser, userId2: idUserConnected }
          ]
        }
      }) > 0;
      return reply.status(200).send({ friend });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
} 

const FriendsController = {
    listFriends,
    listNotFriends,
    listMyFriends,
    countFriends,
    removefriend,
    relationFriend
}

export default FriendsController;