import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../lib/prisma.js";
import axios from "axios";
import { MultipartFile } from "@fastify/multipart";
import FormData from 'form-data';
import https from 'https'
import path from "path";

const createPost = async (req: FastifyRequest, res: FastifyReply) => {
    const upload_url = process.env.UPLOAD_SERVICE_URL || "https://upload_file:3004";
    let group_id = null;
    let description = null;
    let url_image = null;
    const user_id = req.headers['x-user-id'] as string;

    if (!user_id) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    const fieldParts: Record<string, string> = {};
    const fileParts: any[] = [];

    for await (const part of req.parts()) {
        if (part.type === 'file') {
            const buffer = await part.toBuffer();
            fileParts.push({ part, buffer });
        } else if (part.type === 'field') {
            fieldParts[part.fieldname] = part.value as string;
        }
    }

    const desc = fieldParts['desc'];
    const id_group = fieldParts['group_id'];
    const fileEntry = fileParts[0];
    const buffer = fileEntry?.buffer;
    const filePart = fileEntry?.part as MultipartFile;

    if (!desc) {
        return res
            .status(400)
            .send({
                message: "post description required"
            })
    }
    const formData = new FormData();
    if (buffer) {
        formData.append('file', buffer, {
            filename: filePart?.filename,
            contentType: filePart?.mimetype,
        });

        const response = await axios.post(`${upload_url}/upload/post`, formData, {
            headers: {
                ...formData.getHeaders(),
                "x-user-id": user_id,
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });

        const minio_url = process.env.MINIO_URL || "/api/v1/minio/";
        if (response.status === 200) {
            url_image =  minio_url + response.data.path;
        }
        else {
            return res
                .status(response.status)
                .send({
                    message: "Post: error uploading file"
                });
        }
    };

    group_id = id_group || null;
    description = desc;

    await prisma.post.create({
        data: {
            group_id,
            user_id,
            description,
            url_image
        }
    })
        .then(() => {
            res
                .status(201)
                .send({
                    message: "Post created successfully"
                });
        })
        .catch(() => {
            res
                .status(500)
                .send({
                    message: "post:Internal server error"
                });
        });
}

const deletePost = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };

    const user_id = req.headers['x-user-id'] as string;
    if (!user_id) {
        return res
            .status(401)
            .send({
                message: "deletePost: User ID is required in headers"
            });
    }
    if (!id) {
        return res
            .status(400)
            .send({
                message: "deletePost: Post ID is required in params"
            });
    }
    const verify_user = await prisma.post.findUnique({
        where: {
            id: id //post id
        },
        select: {
            user_id: true,
            url_image: true
        },
    });

    if (!verify_user?.user_id) {
        return res
            .status(404)
            .send({
                message: "deletePost: Post not found"
            });
    }
    if (verify_user.user_id !== user_id) {
        return res
            .status(403)
            .send({
                message: "deletePost: Forbidden- You can only delete your own posts"
            });
    }
    if (verify_user.url_image) {
        const upload_url = process.env.UPLOAD_SERVICE_URL || "https://upload_file:3004";
        const minio_url = process.env.MINIO_URL || "/api/v1/minio/";
        const url_to_delete = verify_user.url_image.replace(minio_url, '');
        await axios.delete(`${upload_url}/delete/post`, {
            headers: {
                "x-user-id": user_id,
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
            params: {
                path: url_to_delete
            }
        });
    }
    await prisma.post.delete({
        where: {
            id: id
        }
    }).then(() => {
        res
            .status(200)
            .send({
                message: "deletePost: Post deleted successfully",
            });
    }).catch((error: any) => {
        res
            .status(500)
            .send({
                message: "deletePost: Internal server error",
            });
    });
}

const updatePost = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const upload_url = process.env.UPLOAD_SERVICE_URL || "https://upload_file:3004";
    let description = null;
    let url_image = null;
    let last_url_image = null;
    const user_id = req.headers['x-user-id'] as string;

    if (!user_id) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    const fieldParts: Record<string, string> = {};
    const fileParts: any[] = [];

    try {
        for await (const part of req.parts()) {
            if (part.type === 'file') {
                const buffer = await part.toBuffer();
                fileParts.push({ part, buffer });
            } else if (part.type === 'field') {
                fieldParts[part.fieldname] = part.value as string;
            }
        }
        const desc = fieldParts['desc'];
        const fileEntry = fileParts[0];
        const buffer = fileEntry?.buffer;
        const filePart = fileEntry?.part as MultipartFile;
        const formData = new FormData();

        if (!desc && !buffer) {
            return res
                .status(401)
                .send({
                    message: "Error update post: required one or two fields"
                })
        }
        const postData = await prisma.post.findUnique({
            where: {
                id: id,
            },
            select: {
                url_image: true,
                description: true
            }
        });
        if (buffer) {
            formData.append('file', buffer, {
                filename: filePart?.filename,
                contentType: filePart?.mimetype,
            });
            last_url_image = postData?.url_image;
            const response = await axios.post(`${upload_url}/upload/post`, formData, {
                headers: {
                    ...formData.getHeaders(),
                    "x-user-id": user_id,
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false,
                }),
            });

            if (response.status === 200) {
                url_image = response.data.path;
                if (last_url_image) {
                    await axios.delete(`${upload_url}/delete/post`, {
                        headers: {
                            ...formData.getHeaders(),
                            "x-user-id": user_id,
                        },
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false,
                        }),
                        params: {
                            path: last_url_image
                        }
                    });
                }
            }
            else {
                return res
                    .status(response.status)
                    .send({
                        message: "Post: error uploading file"
                    });
            }
        };
        console.log("url_image", url_image);

        if (!desc) {
            description = postData?.description;
        }
        else {
            description = desc;
        }
        if (!url_image) {
            url_image = postData?.url_image
        }
        await prisma.post.update({
            where: {
                id: id
            },
            data: {
                description,
                url_image
            }
        }).then(() => {
            res
                .status(200)
                .send({
                    message: "updatePost: Post updated successfully",
                });
        }).catch(() => {
            res
                .status(500)
                .send({
                    message: "updatePost: Internal server error"
                });
        });
    } catch (error: any) {
        return res
            .status(error?.status || 500)
            .send({
                message: "Edit post error" + error
            })
    }
}

const likePost = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const user_id = req.headers['x-user-id'] as string;
    if (!user_id) {
        return res
            .status(401)
            .send({
                message: "likePost: User ID is required in headers"
            });
    }
    if (!id) {
        return res
            .status(400)
            .send({
                message: "likePost: Post ID is required in params"
            });
    }
    const postExists = await prisma.post.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    });
    if (!postExists) {
        return res
            .status(404)
            .send({
                message: "Post not found"
            });
    }
    const existing = await prisma.postLike.findUnique({
        where: {
            post_id_user_id: {
                post_id: id,
                user_id: user_id
            }
        }
    });

    if (existing) {
        await prisma.postLike.delete({
            where: {
                post_id_user_id: {
                    post_id: id,
                    user_id: user_id
                }
            }
        }).catch(() => {
            return res
                .status(500)
                .send({ message: "unlikePost: Internal server error" });
        });
    } else {
        await prisma.postLike.create({
            data: {
                post_id: id,
                user_id: user_id
            }
        }).catch(() => {
            return res
                .status(500)
                .send({ message: "likePost: Internal server error" });
        });
    }

    const likeCount = await prisma.postLike.count({
        where: { post_id: id }
    });

    return res
        .status(200)
        .send({
            isLiked: !existing,
            likeCount
        });
}

const postController = {
    createPost,
    deletePost,
    updatePost,
    likePost,
}

export default postController;