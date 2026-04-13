import { FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import https from "https";
import { report } from "process";

const refreshing = async (request: FastifyRequest, reply: FastifyReply, refresh_token: string) => {
  try {
    const v_payload = request.server.jwt.verify(refresh_token);
    const newAccessToken = request.server.jwt.sign(
      {
        id: (v_payload as any).id,
        secret: process.env.JWT_SECRET
      },
      {
        expiresIn: "5m"
      }
    );
    return reply
      .setCookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: false, // mode development
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, //expire in 1 day
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 5 minutes
      })
      .send({ refreshed: true });
  } catch (err) {
    reply
      .clearCookie("access_token", {
        httpOnly: true,
        secure: false, // mode development  
        sameSite: "lax",
        path: "/",
      })
      .clearCookie("refresh_token", {
        httpOnly: true,
        secure: false, // mode development  
        sameSite: "lax",
        path: "/api/v1/auth/",
      })
      .code(401)
      .send({
        message: "Session expired. Please login again."
      });
  }
};

async function refresh_token(request: FastifyRequest, reply: FastifyReply) {

  const refresh = request.cookies?.refresh_token;
  if (!refresh) {
    return (reply.code(401).send({
      message: "No refresh token,  Please login"
    }));
  }

  try {
    const access_token = request.cookies?.access_token;
    if (access_token) {
      const payload = request.server.jwt.verify(access_token);
      if (payload) {
        return (reply
          .status(403)
          .send({
            message: "Access token still valid, no need to refresh"
          }));
      }
    }
    else {
      throw new Error("not access token found");
    }
  } catch (error) {
    refreshing(request, reply, refresh);
  }
};

export default refresh_token;
