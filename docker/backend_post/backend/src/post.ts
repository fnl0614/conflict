import Fastify, {
    FastifyInstance,
    FastifyRegister,
    FastifyReply,
    FastifyRequest
} from "fastify";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs'
import routes from "./routes/postRoutes.js";
import Multipart from "@fastify/multipart";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
        Server.app.register(routes);
    }

    public static async start() {
        await Server.app.register(Multipart, {
            limits: {
                fileSize: 10 * 1024 * 1024, // 10 Mo max par fichier
                files: 1,                // nombre max de fichiers
                fields: 5,                // nombre max de champs texte
                fieldSize: 1024,             // taille max d'un champ texte (1 Ko)
                parts: 10,               // total fichiers + champs combinés
            },
        });
        await Server.registerRoutes();
        Server.app.get("/post", (request: FastifyRequest, reply: FastifyReply) => {
            reply
                .status(200)
                .send({
                    message: "ok Post backend"
                })
        })

        Server.app.listen({
            "port": 3002,
            "host": "0.0.0.0"
        })
    }
};

Server.start();
