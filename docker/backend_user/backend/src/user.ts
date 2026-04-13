import Fastify, {
    FastifyInstance,
    FastifyRegister,
    FastifyReply,
    FastifyRequest
} from "fastify";
import fs from 'fs'
import cors from '@fastify/cors'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import setCookie from "@fastify/cookie";
import { Client } from "minio"
import multipart from '@fastify/multipart';
import friendsRoutes from "./routes/friendsRoutes.js";
import friendsRequestsRoutes from "./routes/friendsRequestsRoutes.js";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

dotenv.config()

class Server {
    private static httpsConfig = {
        key: process.env.SSL_KEY64 ? Buffer.from(process.env.SSL_KEY64, 'base64') : fs.readFileSync("/etc/ssl/app/private.key"),
        cert: process.env.SSL_CRT64 ? Buffer.from(process.env.SSL_CRT64, 'base64') : fs.readFileSync("/etc/ssl/app/public.crt"),
    };

    private static app: FastifyInstance = Fastify({
        logger: true,
        ...(Server.httpsConfig ? { https: Server.httpsConfig } : {}),
    });

    private static setCors() {
        Server.app.register(setCookie,
            {
                secret: process.env.COOKIE_SECRET || "supersecret",
                parseOptions: {
                    httpOnly: true,
                }
            }
        );
        Server.app.register(cors, {
            origin: true,
            exposedHeaders: ['set-cookie'],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Origin'],
        });
        Server.app.register(multipart, {
            limits: {
                fileSize: 50 * 1024 * 1024,  // 50MB
                files: 1,
                fieldSize: 1 * 1024 * 1024,
            }
        });
    }

    private static async registerRoutes() {
        Server.app.register(userRoutes);
        Server.app.register(friendsRoutes);
        Server.app.register(friendsRequestsRoutes);
    }

    public static async start() {
        Server.setCors();
        Server.registerRoutes();
        Server.app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
            reply
                .status(200)
                .send({
                    message: "ok user auth!"
                })
        })

        Server.app.listen({
            "port": 3001,
            "host": "0.0.0.0"
        })
    }
};

Server.start();