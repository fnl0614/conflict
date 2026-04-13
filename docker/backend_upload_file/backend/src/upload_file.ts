import Fastify, {
    FastifyInstance,
    FastifyRegister,
    FastifyReply,
    FastifyRequest
} from "fastify";
import env from "dotenv";
import multipart from "@fastify/multipart";
import routes from "./routes/upload_routes.js";
env.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import fs from 'fs'

class Server {
    private static httpsConfig = {
        key: process.env.SSL_KEY64 ? Buffer.from(process.env.SSL_KEY64, 'base64') : fs.readFileSync("/etc/ssl/app/private.key"),
        cert: process.env.SSL_CRT64 ? Buffer.from(process.env.SSL_CRT64, 'base64') : fs.readFileSync("/etc/ssl/app/public.crt"),
    };

    private static app: FastifyInstance = Fastify({
        logger: true,
        ...(Server.httpsConfig ? { https: Server.httpsConfig } : {}),
    });

    private static async registerRoutes() {
        Server.app.register(multipart, {
            limits: {
                fileSize: 50 * 1024 * 1024,  // 50MB
                files: 1,
                fieldSize: 1 * 1024 * 1024,
            }
        });
        Server.app.register(routes);
    }

    public static async start() {
        Server.registerRoutes();
        Server.app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
            reply
                .status(200)
                .send({
                    message: "welcome to upload file service"
                })
        })

        Server.app.listen({
            "port": 3004,
            "host": "0.0.0.0"
        })
    }

};

Server.start();