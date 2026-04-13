import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { deleteUser, findUser, getAllUsers } from "../services/userService.js";
import { Users } from "../../node_modules/.prisma/client/index.js";
import prisma from "../lib/prisma.js";
import { sha512 } from "sha512-crypt-ts";
import dotenv from 'dotenv'
import axios from "axios";
import https from "https";
import FormData from 'form-data';
import { Multipart } from "@fastify/multipart";

dotenv.config()

async function listUsersFromId(request: FastifyRequest, reply: FastifyReply) {

  try {
    const {userIds} = request.body as { userIds:Array<string> };
    const users = await prisma.users.findMany({
      where: {
        id : { in: userIds }
      },
      select: {
        id: true,
        email: true,
        lastName: true,
        firstName: true,
        status: true,
        urlProfil: true,
        urlCover: true,
      },
    });
    return reply
      .status(200).send({
        users
      });
  } catch (error) {
    reply
      .status(500)
      .send({
        message: "Internal server error"
      });
  }
}

async function listUsers(request: FastifyRequest, reply: FastifyReply) {

  const idUser = request.headers['x-user-id'];

  if (!idUser)
    return reply.status(401).send({ message: "Unauthorized" });
  try {
    const users = await prisma.users.findMany({
      where: {
        NOT: {
          id: idUser as string,
        },
      },
      select: {
        id: true,
        email: true,
        lastName: true,
        firstName: true,
        status: true,
        urlProfil: true,
        urlCover: true,
      },
    });
    if (users)
      return reply.status(200).send({ users });
    else
      return reply.status(404).send({ message: "No user found!" })
  } catch (error) {
    reply
      .status(500)
      .send({
        message: "Internal server error"
      });
  }
}

async function findUsers(request: FastifyRequest, reply: FastifyReply) {
  const { UserInfo } = request.params as any;
  try {
    const users = await findUser(UserInfo);
    return users;
  } catch (Error) {
    return (
      reply
        .status(404)
        .send({
          message: "Not found"
        })
    )
  }
}

async function removeUser(request: FastifyRequest, reply: FastifyReply) {
  const { email } = request.params as any;

  try {
    const resp = await deleteUser(email);
    if (!resp) {
      throw new Error();
    }
    return (resp);
  } catch (error) {
    return (
      reply
        .status(404)
        .send({
          message: "Not found"
        })
    )
  }
}

const userRegistration = async (request: FastifyRequest, reply: FastifyReply) => {
  const userData: Users = request.body as Users;
  let createdUser: Users | null = null;
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: userData.email
      }
    })

    if (user && user.password === '') {
      const updatedUser = await prisma.users.update({
        where: { email: userData.email },
        data: {
          lastName: userData.lastName,
          firstName: userData.firstName,
          password: sha512.crypt(userData.password, 'transcendence'),
        },
      })
      if (!updatedUser)
        return reply
          .status(500)
          .send({
            message: "Registration failed!"
          });
      return reply
        .status(200)
        .send({
          message: "Registration successfully!"
        });
    }
    if (user && user.password !== '')
      return reply
        .status(401)
        .send({
          message: "the user already exists"
        });
    createdUser = await prisma.users.create({
      data: {
        lastName: userData.lastName,
        firstName: userData.firstName,
        email: userData.email,
        password: sha512.crypt(userData.password, 'transcendence'),
      },
    })
    if (!createdUser)
      return reply
        .status(500)
        .send({
          message: "Registration failed!"
        });
    return reply
      .status(201)
      .send({
        message: "Registration successfully!"
      });
  } catch (error) {
    console.error("Error during user registration:\n\n", error);
    reply
      .status(500)
      .send({
        message: "Internal server error login"
      });
  }
}

const userLogin = async (request: FastifyRequest, reply: FastifyReply) => {
  const userData: Users = request.body as Users;

  userData.password = sha512.crypt(userData.password, 'transcendence');
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: userData.email
      }
    })
    if (user) {
      if (user.password == userData.password) {
        user.password = "";
        return reply.status(200).send({
          id: user.id,
          message: "Login successfully!"
        });
      }
      else {
        return reply.status(401).send({
          message: "Invalid password!"
        })
      }
    }
    else {
      return reply.status(404).send({
        message: "User not found!"
      })
    }
  }
  catch (error) {
    return reply
      .status(500)
      .send({
        message: "Internal Server Error"
      });
  }
}

async function userLogout(request: FastifyRequest, reply: FastifyReply) {
  const id = request.headers['x-user-id'] as string; // Récupère l'ID utilisateur depuis les en-têtes

  if (!id) {
    return reply
      .status(400)
      .send({
        message: "Empty field! id"
      });
  }

  const updatedUser = await prisma.users.update({
    where: { id: id },
    data: {
      status: false
    }
  });
  if (!updatedUser) {
    return reply
      .status(404)
      .send({
        message: "User not found!"
      });
  }

  return reply
    .status(200)
    .send({
      message: "Logout successfully!"
    });
}

async function getMyProfile(request: FastifyRequest, reply: FastifyReply) {
  const id = request.headers['x-user-id'] as string;
  if (!id) {
    return reply
      .status(400)
      .send({
        message: "User ID not found in headers!"
      });
  }



  const user = await prisma.users.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      lastName: true,
      firstName: true,
      status: true,
      urlProfil: true,
      urlCover: true,
    }
  });

  console.log("\n\nGet my profile:\n   ", user);

  if (user) {
    reply.status(200).send({ user });
  }
  else {
    reply.status(404).send({
      message: "user not found",
    });
  }
}

const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const user = await prisma.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        urlProfil: true,
        urlCover: true
      }
    });

    if (!user) {
      return reply
        .status(404)
        .send({
          message: "User not found"
        });
    }
    return reply
      .status(200)
      .send({ user });
  } catch (error) {
    return reply
      .status(500)
      .send({
        message: "Internal server error"
      });
  }

}

const userUpdate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const id = request.headers['x-user-id'] as string;
    const updateData: Partial<Users> = request.body as Partial<Users>;

    const user = await prisma.users.findUnique({
      where: { id: id }
    });

    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }

    const dataToUpdate: any = {};

    if (updateData.firstName) dataToUpdate.firstName = updateData.firstName;
    if (updateData.lastName) dataToUpdate.lastName = updateData.lastName;
    if (updateData.email) dataToUpdate.email = updateData.email;
    if (updateData.status !== undefined) dataToUpdate.status = updateData.status;
    if (updateData.urlProfil) dataToUpdate.urlProfil = updateData.urlProfil;
    if (updateData.urlCover) dataToUpdate.urlCover = updateData.urlCover;

    if (updateData.password) {
      // dataToUpdate.password = sha512.crypt(updateData.password, 'transcendence');
      return reply.status(400).send({ error: "To update password, please use the dedicated endpoint." });
    }

    const updatedUser = await prisma.users.update({
      where: { id: id },
      data: dataToUpdate
    });

    updatedUser.password = "";
    return reply
      .status(200)
      .send({
        user: updatedUser
      });
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({
        message: "Internal server error"
      });
  }
}

export type UpdatePasswordRequest = {
  currentPassword: string; //ST_PWD {currentPassword = ST_PWD} {newPassword} {newPasswordConfirm}
  newPassword: string;
  newPasswordConfirm: string;
}

const userUpdatePassword = async (request: FastifyRequest & { body: UpdatePasswordRequest }, reply: FastifyReply) => {
  try {
    const id = request.headers['x-user-id'] as string;
    const { currentPassword, newPassword, newPasswordConfirm } = request.body;


    console.log("\n\nUpdate password request:\n   ", { id, currentPassword, newPassword, newPasswordConfirm });
    if (newPassword !== newPasswordConfirm) {
      return reply
        .status(400)
        .send({
          message: "New passwords do not match"
        });
    }

    const user = await prisma.users.findUnique({
      where: { id: id }
    });

    if (!user) {
      return reply
        .status(404)
        .send({
          message: "User not found"
        });
    }
    if (currentPassword === "ST_PWD") {
      const updatedUser = await prisma.users.update({
        where: { id: id },
        data: {
          password: sha512.crypt(newPassword, 'transcendence')
        },
        select: {
          id: true,
        }
      });
      if (!updatedUser) {
        return reply
          .status(500)
          .send({
            message: "Failed to set password"
          });
      }
      return reply
        .status(200)
        .send({
          message: "Password set successfully!",
        });
    }

    if (user.password !== sha512.crypt(currentPassword, 'transcendence')) {
      return reply
        .status(401)
        .send({
          message: "Current password is incorrect"
        });
    }

    const updatedUser = await prisma.users.update({
      where: { id: id },
      data: {
        password: sha512.crypt(newPassword, 'transcendence')
      }
    });

    updatedUser.password = "";
    return reply
      .status(200)
      .send({
        user: updatedUser
      });
  }
  catch (error) {
    return reply
      .status(500)
      .send({
        message: "Internal server error"
      });
  }
}


const userUpdateProfileImage = async (request: FastifyRequest, reply: FastifyReply) => {
  const user_id = request.headers['x-user-id'] as string;
  const { type } = request.params as { type: string };

  if (!user_id) {
    return reply
      .status(400)
      .send({
        message: "user id required from update profile image"
      });
  }
  if (!type) {
    return reply
      .status(400)
      .send({
        message: "type required from update profile image"
      });
  }

  const data = await request.file();

  if (!data) {
    return reply
      .status(400)
      .send({
        message: "file required"
      });
  }

  const formData = new FormData();
  formData.append('file', data.file, {
    filename: data.filename,
    contentType: data.mimetype,
  });

  const url = process.env.UPLOAD_FILE_URL || "https://upload_file:3004";
  const minio_url = process.env.MINIO_URL || "/api/v1/minio/";

  const response = await axios.post(`${url}/upload/${type}`, formData, {
    headers: {
      ...formData.getHeaders(),
      'x-user-id': user_id,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });

  if (!response) {
    return reply
      .status(500)
      .send({
        message: "update profile: upload file error"
      });
  }

  if (response.status == 200) {

    if (type == "pdp") {

      const lastUrl = await prisma.users.findUnique({
        where: {
          id: user_id
        },
        select: {
          urlProfil: true
        }
      });

      const updatedUser = await prisma.users.update({
        where: { id: user_id },
        data: {
          urlProfil: `${minio_url}${response.data.path}`
        },
        select: {
          id: true,
          email: true,
          lastName: true,
          firstName: true,
          urlProfil: true,
          urlCover: true
        }
      });
      if (updatedUser) {
        if (lastUrl?.urlProfil) {
          const url_to_delete = lastUrl.urlProfil.replace(minio_url, '');
          await axios.delete(`${url}/delete/${type}`, {
            headers: {
              'x-user-id': user_id,
            },
            httpsAgent: new https.Agent({
              rejectUnauthorized: false,
            }),
            params: {
              path: url_to_delete
            }
          });
        }
        return reply
          .status(200)
          .send({
            updatedUser
          });
      }
    }

    if (type == "pdc") {

      const lastUrl = await prisma.users.findUnique({
        where: {
          id: user_id
        },
        select: {
          urlCover: true
        }
      });

      const updatedUser = await prisma.users.update({
        where: { id: user_id },
        data: {
          urlCover: `${minio_url}${response.data.path}`
        },
        select: {
          id: true,
          email: true,
          lastName: true,
          firstName: true,
          urlProfil: true,
          urlCover: true
        }
      });
      if (updatedUser) {
          if (lastUrl?.urlCover) {
            const url_to_delete = lastUrl.urlCover.replace(minio_url, '');
            await axios.delete(`${url}/delete/${type}`, {
              headers: {
                'x-user-id': user_id,
              },
              httpsAgent: new https.Agent({
                rejectUnauthorized: false,
              }),
              params: {
                path: url_to_delete
              }
            });
          }
          return reply
            .status(200)
            .send({
              updatedUser
            });
        }
      }
    }
    return reply
      .status(400)
      .send({
        message: `Error updating image ${type}`
      })
  };

const googleAccess = async (request: FastifyRequest, reply: FastifyReply) => {
  const value = request.body as any;

  if (!value || !value.value) {
    return reply
      .status(400)
      .send({
        message: "Information is required!"
      });
  }

  try {
    const userData = await prisma.users.findUnique({
      where: {
        email: value.value.email
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        password: true
      }
    });

    console.log("\n\n\n\nGoogle access:\n");
    console.log(userData);

    if (!userData) {
      const response = await prisma.users.create({
        data: {
          email: value.value.email,
          firstName: value.value.given_name,
          lastName: value.value.family_name,
          password: "",
        },
      });
      if (!response) {
        return reply
          .status(500)
          .send({
            message: "Failed to log in with Google"
          });
      }
      return reply
        .status(200)
        .send({
          id: response.id,
          message: "ST_PWD"
        });
    }
    else {
      if (userData.password === '') {
        return reply
          .status(200)
          .send({
            id: userData.id,
            message: "ST_PWD"
          });
      }
      return reply
        .status(200)
        .send({
          id: userData.id,
          message: "Login successfully!"
        });
    }
  } catch (error) {
    console.error("Error during Google access:\n\n", error);
    return reply
      .status(500)
      .send({
        message: "Internal server error"
      });
  }
}

const userController = {
  listUsers,
  listUsersFromId,
  findUsers,
  removeUser,
  userRegistration,
  userLogin,
  userUpdate,
  userLogout,
  getMyProfile,
  getProfile,
  userUpdatePassword,
  userUpdateProfileImage,
  googleAccess
}

  export default userController;
