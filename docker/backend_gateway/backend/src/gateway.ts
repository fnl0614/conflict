import Fastify, {
    FastifyInstance,
    FastifyRegister,
    FastifyReply,
    FastifyRequest
} from "fastify";
import axios from 'axios'
import refreshToken from "./plugins/refreshToken.js";
import setCookie from "@fastify/cookie";
import https from 'https'
import crypto from "crypto";

import proxy from "@fastify/http-proxy"
import dotenv from 'dotenv'
import init_JWT from "./plugins/jwt.js"
import cors from "@fastify/cors";
import auth from "./plugins/VerifyToken.js";
import fs from 'fs'
import routes from "./routes/routes.js";
import User from "./types/user.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
dotenv.config()

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

class Server {
    private static httpsConfig = {
        key: process.env.SSL_KEY64 ? Buffer.from(process.env.SSL_KEY64, 'base64') : fs.readFileSync("/etc/ssl/app/private.key"),
        cert: process.env.SSL_CRT64 ? Buffer.from(process.env.SSL_CRT64, 'base64') : fs.readFileSync("/etc/ssl/app/public.crt"),
    };

    private static app: FastifyInstance = Fastify({
        logger: true,
        ...(Server.httpsConfig ? { https: Server.httpsConfig } : {}),
    });

    private register_route() {
        Server.app.register(setCookie,
            {
                secret: process.env.COOKIE_SECRET || "supersecret",
            }
        );
        Server.app.register(proxy, {
            upstream: process.env.USER_SERVICE_URL || "https://user:3001",
            preHandler: auth,
            prefix: "/api/v1/user/",
            websocket: true,
        })


        Server.app.register(proxy, {
            upstream: process.env.POST_SERVICE_URL || "https://post:3002",
            preHandler: auth,
            prefix: "/api/v1/post/",
            websocket: true,
        })

        Server.app.register(proxy, {
            upstream: process.env.CHAT_SERVICE_URL || "https://chat:3003",
            preHandler: auth,
            prefix: "/api/v1/chat/",
            websocket: true,
        })

        Server.app.register(proxy, {
            preHandler: auth,
            upstream: process.env.UPLOADFILE_SERVICE_URL || "https://upload_file:3004",
            prefix: "/api/v1/file/",
            websocket: true,
        })
        Server.app.register(proxy, {
            upstream: process.env.MINIO_SERVICE_URL || "https://minio:9000",
            prefix: "/api/v1/minio/",
            rewritePrefix: "",
            websocket: false,
        })

        Server.app.register(proxy, {
            upstream: "https://group:3005",
            preHandler: auth,
            prefix: "/api/v1/group/",
            websocket: true,
        })
    }

    public static async start() {
        Server.app.register(cors, {
            origin: true,
            credentials: true,
        });
        const instance_server = new Server();
        init_JWT.init(Server.app);
        instance_server.register_route();
        Server.app.register(routes, { prefix: '/api/v1' });
        Server.app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
            reply
                .status(200)
                .send({
                    message: "Welcome to the API Gateway! This service proxies requests to the User, Post, Chat, and UploadFile services. Please use the /api/v1/ prefix for all API requests."
                })
        })

        Server.app.listen({
            "port": 3000,
            "host": "0.0.0.0"
        })
    }

};

Server.start();

