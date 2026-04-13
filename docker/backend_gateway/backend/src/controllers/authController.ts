import fastify, { FastifyReply, FastifyRequest } from "fastify";
import axios from 'axios'
import https from 'https'
import refresh_token from "../plugins/refreshToken.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

interface User {
    email: string,
    password: string
}

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

const login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as User;
    const url = process.env.USER_SERVICE_URL || "https://user:3001";

    if (!url) {
        return reply.status(500).send({
            message: "User service URL not configured"
        });
    }
    if (email && password) {
        let urlPath = `${url}/login`
        try {
            const res = await axios.post(
                urlPath,
                {
                    email,
                    password
                },
                {
                    withCredentials: true,
                    httpsAgent: httpsAgent // Auto-accept self-signed certificates
                }
            );
            if (res.status == 200) {
                const refresToken = request.server.jwt.sign({
                    id: res.data.id,
                    secret: process.env.JWT_SECRET
                }, {
                    expiresIn: "3d"
                });

                const logintoken = request.server.jwt.sign({
                    id: res.data.id,
                    secret: process.env.JWT_SECRET
                }, {
                    expiresIn: "1d"
                });

                reply
                    .setCookie("access_token", logintoken, {
                        httpOnly: true,
                        secure: false, // mode development
                        sameSite: "lax",
                        path: "/",
                        maxAge: 60 * 60 * 24, //expire in 1 day for testing
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day for testing

                    })
                    .setCookie("refresh_token", refresToken, {
                        httpOnly: true,
                        secure: false, // mode development
                        sameSite: "lax",
                        path: "/api/v1/auth/",
                        maxAge: (60 * 60 * 24 * 3) + (60 * 60), //expire in 3jrs 
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) // 3 days
                    });
            }
            else {
                return reply
                    .status(res.status)
                    .send({
                        message: "Login failed!"
                    });
            }
        } catch (error: any) {
            if (error.response) {
                return reply.status(error.response.status).send(error.response.data);
            }
            return reply.status(500).send({
                message: "Internal Login server error",
            });
        }
        return reply
            .status(200)
            .send({
                message: "login successfully!"
            })
    } else {
        return reply
            .status(400)
            .send({
                message: "Empty field! email/password"
            })
    }

}

const logout = async (request: FastifyRequest, reply: FastifyReply) => {
    const xUserId = request.headers['x-user-id'] as string;
    const url = process.env.USER_SERVICE_URL || "https://user:3001";

    if (!xUserId) {
        return reply
            .status(400)
            .send({
                message: "User ID not provided in request headers!"
            });
    }
    if (!url) {
        return reply.status(500).send({
            message: "User service URL not configured"
        });
    }
    try {
        let urlPath = `${url}/logout`
        const resp = await axios({
            method: request.method,
            url: urlPath,
            headers: {
                ...request.headers,
                'x-user-id': request.user.id ?? xUserId // Ajout de l'en-tête
            },
            data: request.body
        });

        if (resp.status === 200) {
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
                .status(200)
                .send({
                    message: "Logout successfully!"
                });
        }
        else {
            return reply
                .status(resp.status)
                .send({
                    message: "Logout failed!"
                });
        }

    } catch (error: any) {
        if (error.response) {
            return reply.status(error.response.status).send(error.response.data);
        }
        return reply
            .status(500)
            .send({
                message: "Internal Logout server error",
            });
    }
}

const refreshToken = async (request: FastifyRequest, reply: FastifyReply) => {
    const refresh = request.cookies?.refresh_token;
    const access_token = request.cookies?.access_token;

    if (!refresh) {
        return reply
            .code(401)
            .send({
                message: "No refresh token,  Please login"
            });
    }
    else {
        refresh_token(request, reply);
    }
}

const googleLogin = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { access } = request.body as { access: string };
        let value;
        if (!access) {
            return reply
                .status(400)
                .send({
                    message: 'Access token required'
                });
        }
        const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
            headers: {
            Authorization: `Bearer ${access}`,
            },
        }
        );

        const tokenInfo = await userInfoResponse.json();

        if (tokenInfo.error) {
            return reply
                .status(401)
                .send({
                    message: 'Invalid access token'
                });
        }

        value = tokenInfo;
        if (!value) {
            return reply
                .status(400)
                .send({
                    message: "Failed to decode ID token"
                });
        }
        const USER_HOST = process.env.USER_SERVICE_URL || "https://user:3001";
        const response = await axios.post(`${USER_HOST}/access/google`, {
            value
        }, {
            httpsAgent
        })
        if (response.status !== 200) {
            return reply
                .status(response.status)
                .send({
                    message: "Failed to log in with Google"
                });
        }
        const refresToken = request.server.jwt.sign({
            id: response.data.id,
            secret: process.env.JWT_SECRET
        }, {
            expiresIn: "3d"
        });

        if (!refresToken) {
            return reply
                .status(500)
                .send({
                    message: "Failed to generate refresh token"
                });
        }
        const logintoken = request.server.jwt.sign({
            id: response.data.id,
            secret: process.env.JWT_SECRET
        }, {
            expiresIn: "1d"
        });

        if (!logintoken) {
            return reply
                .status(500)
                .send({
                    message: "Failed to generate access token"
                });
        }
        return reply
            .setCookie("access_token", logintoken, {
                httpOnly: true,
                secure: false, // mode development
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24, //expire in 1 day for testing
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day for testing

            })
            .setCookie("refresh_token", refresToken, {
                httpOnly: true,
                secure: false, // mode development
                sameSite: "lax",
                path: "/api/v1/auth/",
                maxAge: (60 * 60 * 24 * 3) + (60 * 60), //expire in 3jrs 
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) // 3 days
            })
            .status(200)
            .send(response.data);
    } catch (error) {
        console.error("Error logging access token:\n\n", error);
        return reply
            .status(500)
            .send({
                message: "An error occurred during Google login"
            });
    }
}
const userController = {
    login,
    logout,
    refreshToken,
    googleLogin
}

export default userController;