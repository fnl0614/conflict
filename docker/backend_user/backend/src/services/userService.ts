import fastify, { FastifyInstance } from 'fastify';
import prisma from '../lib/prisma.js'
import bcrypt from "bcrypt";

export async function createUser(email: string, password: string) {

  const existingUser = await prisma.users.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error("email already exists");
  }
  const hash = await bcrypt.hash(password, 10);
  return await prisma.users.create({
    data: {
      email,
      password: hash,
      status: true,
    },
  });
}

export async function findUser(userInfo: string) {
  const userdata = await prisma.users.findMany({
    where: {
      email: {
        contains: userInfo,
        mode: 'insensitive'
      }
    },
    select: {
      email: true,
      createdAt: true
    },
    orderBy: {
      email: 'asc'
    }
  });
  if (!userdata) {
    throw new Error("Not found");
  }
  return userdata;
}

export async function getAllUsers() {
  return await prisma.users.findMany();
}

export async function deleteUser(email: string) {
  return (await prisma.users.delete({
    where: {
      email: email,
    }
  }));
}
