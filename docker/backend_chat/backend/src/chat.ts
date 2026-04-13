import Fastify, {
    FastifyInstance,
    FastifyRegister,
    FastifyReply,
    FastifyRequest
} from "fastify";

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


    public static async start() {
        Server.app.get("/api/v1/chat", (request: FastifyRequest, reply: FastifyReply) => {
            reply
                .status(200)
                .send({
                    message: "ok chat backend"
                })
        })

        Server.app.listen({
            "port": 3003,
            "host": "0.0.0.0"
        })
    }
};

Server.start();