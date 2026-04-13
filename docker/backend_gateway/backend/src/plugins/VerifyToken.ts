import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import https from "https";

const auth = async (request: FastifyRequest, reply: FastifyReply) => {

  if (
    request.url.startsWith("/api/v1/user/register") &&
    request.method === "POST"
  ) {
    return;
  }
  if (
    request.url.startsWith("/api/v1/user/login") &&
    request.method === "POST"
  ) {
    return;
  }
  try {
    const access_token = request.cookies?.access_token;

    if (!access_token) {
      return reply.code(401).send({
        message: "Unauthorized: No token"
      });
    }
    const decoded: any = request.server.jwt.verify(access_token);
    const user_id = decoded.id;
    const baseURL = process.env.USER_SERVICE_URL || "https://user:3001";
    const user = await axios.get(`${baseURL}/profile/${user_id}`, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
    });
    
    if (!user.data?.user.id) {
      return reply
        .clearCookie("access_token", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
        })
        .clearCookie("refresh_token", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/api/v1/auth/",
        })
        .status(401)
        .send({
          message: "Unauthorized: User not found"
        });
    }
    else {
      request.headers["x-user-id"] = String(decoded.id);
      request.user = {
        id: decoded.id
      };
    }
  } catch (err: any) {
    return reply.code(401).send({
      message: err.message || "Unauthorized"
    });
  }
};

export default auth;