import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../lib/prisma.js";
import axios from "axios";
import { MultipartFile } from "@fastify/multipart";
import FormData from 'form-data';
import https from 'https'


const getUserInfo = async (user_id: string) => {
    try {
        const baseURL = process.env.USER_SERVICE_URL || "https://user:3001";
        const response = await axios.get(`${baseURL}/profile/${user_id}`, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

const getUserPosts = async (req: FastifyRequest, res: FastifyReply) => { // with user_id or group_id\
    const { target_id } = req.params as { target_id: string };
    const user_id = req.headers['x-user-id'] as string;

    if (!target_id) {
        return res
            .status(401)
            .send({
                message: "getAllUserPosts: User ID is required in headers"
            });
    }
    await prisma.post.findMany({
        where: {
            user_id: target_id,
            group_id: null,
        },
        select: {
            id: true,
            description: true,
            url_image: true,
            user_id: true,
            group_id: true,
            created_at: true,
            _count: {
                select: { likes: true }
            },
            likes: {
                where: { user_id: user_id },
                select: { id: true }
            }
        },
        orderBy: { created_at: "desc" }
    }).then(async (posts) => {
        const uniqueUserIds = [...new Set(posts.map((post) => post.user_id))];

        const authors = await Promise.all(
            uniqueUserIds.map(async (id) => {
                const author = await getUserInfo(id);
                return { id, author };
            })
        );

        const authorMap = new Map(authors.map(({ id, author }) => [id, author]));

        const formatted = posts.map((post) => {
            const author = authorMap.get(post.user_id);
            return {
                ...post,
                likeCount: post._count.likes,
                isLiked: post.likes.length > 0,
                _count: undefined,
                likes: undefined,
                author: author ? {
                    id: author.user.id,
                    email: author.user.email,
                    lastName: author.user.lastName,
                    firstName: author.user.firstName,
                    urlProfil: author.user.urlProfil,
                } : null,
            };
        });

        return res
            .status(200)
            .send({
                formatted
            });
    })
}

const getPost = async (req: FastifyRequest, res: FastifyReply) => {
    const user_id = req.headers['x-user-id'] as string;
    const { id } = req.params as { id: string };

    if (!user_id) {
        return res
            .status(401)
            .send({ message: "getPost: User ID is required in headers" });
    }
    if (!id) {
        return res
            .status(400)
            .send({ message: "getPost: Post ID is required in params" });
    }

    await prisma.post.findUnique({
        where: {
            id: id,
            group_id: null,
        },
        select: {
            id: true,
            description: true,
            url_image: true,
            user_id: true,
            group_id: true,
            created_at: true,
            _count: {
                select: { likes: true }
            },
            likes: {
                where: { user_id: user_id },
                select: { id: true }
            }
        },
    }).then(async (post) => {
        if (!post) {
            return res
                .status(404)
                .send({
                    message: "getPost: Post not found"
                });
        }

        const author = await getUserInfo(post.user_id);
        const formatted = {
            ...post,
            likeCount: post._count.likes,
            isLiked: post.likes.length > 0,
            _count: undefined,
            likes: undefined,
            author: author ? {
                id: author.user.id,
                email: author.user.email,
                lastName: author.user.lastName,
                firstName: author.user.firstName,
                urlProfil: author.user.urlProfil,
            } : null,
        };
        return res
            .status(200)
            .send({
                formatted
            });
    }).catch(() => {
        res
            .status(500)
            .send({
                message: "getPost: Internal server error",
            });
    });
}

const getAllUserPosts = async (req: FastifyRequest, res: FastifyReply) => { // with user_id or group_id\
    const user_id = req.headers['x-user-id'] as string;

    if (!user_id) {
        return res
            .status(401)
            .send({
                message: "getAllUserPosts: User ID is required in headers"
            });
    }


    await prisma.post.findMany({
        where: {
            user_id: user_id,
            group_id: null,
        },
        select: {
            id: true,
            description: true,
            url_image: true,
            user_id: true,
            group_id: true,
            created_at: true,
            _count: {
                select: { likes: true }
            },
            likes: {
                where: { user_id: user_id },
                select: { id: true }
            }
        },
        orderBy: { created_at: "desc" }
    }).then(async (posts) => {
        const uniqueUserIds = [...new Set(posts.map((post) => post.user_id))];

        const authors = await Promise.all(
            uniqueUserIds.map(async (id) => {
                const author = await getUserInfo(id);
                return { id, author };
            })
        );

        const authorMap = new Map(authors.map(({ id, author }) => [id, author]));

        const formatted = posts.map((post) => {
            const author = authorMap.get(post.user_id);

            return {
                ...post,
                likeCount: post._count.likes,
                isLiked: post.likes.length > 0,
                _count: undefined,
                likes: undefined,
                author: author ? {
                    id: author.user.id,
                    email: author.user.email,
                    lastName: author.user.lastName,
                    firstName: author.user.firstName,
                    urlProfil: author.user.urlProfil,
                } : null,
            };
        });

        return res
            .status(200)
            .send({
                formatted
            });
    })
}

async function getFriendsList(userId: string) {
    const url = process.env.USER_SERVICE_URL || "https://user:3001";
    const { data } = await axios.get(`${url}/list/myFriends`, {
        headers: { "x-user-id": userId },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        params: { page: 0, count: 1000 }
    });

    const friendIds = data.friendsList.map((f: { id: string }) => f.id);
    const friendsMap = Object.fromEntries(
        data.friendsList.map((f: any) => [f.id, f])
    );

    return { friendIds, friendsMap };
}

const getAllPosts = async (req: FastifyRequest, res: FastifyReply) => {
    const user_id = req.headers['x-user-id'] as string;

    if (!user_id) {
        return res
            .status(401)
            .send({
                message: "getAllPosts: User ID is required in headers"
            });
    }

    const { friendIds } = await getFriendsList(user_id);

    if (friendIds.length === 0) {
        return res.status(200).send({ formatted: [] });
    }

    await prisma.post.findMany({
        where: {
            user_id: { in: friendIds },
        },
        select: {
            id: true,
            description: true,
            url_image: true,
            user_id: true,
            group_id: true,
            created_at: true,
            _count: {
                select: { likes: true }
            },
            likes: {
                where: { user_id: user_id },
                select: { id: true }
            }
        },
        orderBy: { created_at: "desc" }
    }).then(async (posts) => {
        const uniqueUserIds = [...new Set(posts.map((post) => post.user_id))];

        const authors = await Promise.all(
            uniqueUserIds.map(async (id) => {
                const author = await getUserInfo(id);
                return { id, author };
            })
        );

        const authorMap = new Map(authors.map(({ id, author }) => [id, author]));

        const formatted = posts.map((post) => {
            const author = authorMap.get(post.user_id);
            return {
                ...post,
                likeCount: post._count.likes,
                isLiked: post.likes.length > 0,
                _count: undefined,
                likes: undefined,
                author: author ? {
                    id: author.user.id,
                    email: author.user.email,
                    lastName: author.user.lastName,
                    firstName: author.user.firstName,
                    urlProfil: author.user.urlProfil,
                } : null,
            };
        });

        return res
            .status(200)
            .send({
                formatted
            });
    })
}

const getAllGroupPosts = async (req: FastifyRequest, res: FastifyReply) => {
    const user_id = req.headers['x-user-id'] as string;
    const { GroupId } = req.params as { GroupId: string };

    if (!user_id) {
        return res
            .status(401)
            .send({
                message: "getAllGroupPosts: User ID is required in headers"
            });
    }
    if (!GroupId) {
        return res
            .status(400)
            .send({
                message: "getAllGroupPosts: Group ID is required in params"
            });
    }

    await prisma.post.findMany({
        where: {
            group_id: GroupId,
        },
        select: {
            id: true,
            description: true,
            url_image: true,
            user_id: true,
            group_id: true,
            created_at: true,
            _count: {
                select: { likes: true }
            },
            likes: {
                where: { user_id: user_id },
                select: { id: true }
            }
        },
        orderBy: { created_at: "desc" }
    }).then(async (posts) => {
        const uniqueUserIds = [...new Set(posts.map((post) => post.user_id))];

        const authors = await Promise.all(
            uniqueUserIds.map(async (id) => {
                const author = await getUserInfo(id);
                return { id, author };
            })
        );

        const authorMap = new Map(authors.map(({ id, author }) => [id, author]));

        const formatted = posts.map((post) => {
            const author = authorMap.get(post.user_id);
            return {
                ...post,
                likeCount: post._count.likes,
                isLiked: post.likes.length > 0,
                _count: undefined,
                likes: undefined,   
                author: author ? {
                    id: author.user.id,
                    email: author.user.email,
                    lastName: author.user.lastName,
                    firstName: author.user.firstName,
                    urlProfil: author.user.urlProfil,
                } : null,
            };
        });

        return res
            .status(200)
            .send({
                formatted
            });
    })
}

const getPostController = {
    getPost,
    getAllUserPosts,
    getAllPosts,
    getUserPosts,
    getAllGroupPosts
}

export default getPostController;