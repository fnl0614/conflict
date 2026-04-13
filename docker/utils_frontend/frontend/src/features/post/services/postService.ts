import axios from "axios";
import type { AxiosError } from "axios";
import { notify } from "../../../shared/utils/notify";

const createPost = async (data: FormData) => {
    try {
        const postUrl = import.meta.env.VITE_CREATE_POST_URL;
        const response = await axios.post(postUrl, data, {
            withCredentials: true,
        });

        notify("Post created successfully", "success");
        return (response.data);
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            notify((err.response?.data as { message: string }).message, "error");
        }
        return (null);
    }
}

const getPostFeed = async (isHome?: boolean, user_id?: string, group_id?: string) => {
    let getUrl : string;
    if (isHome)
        getUrl = import.meta.env.VITE_GET_HOME_POST_FEED_URL;
    else {
        if (user_id)
            getUrl = import.meta.env.VITE_GET_POST_FEED_BY_ID_URL + user_id;
        else if (group_id)
            getUrl = import.meta.env.VITE_GET_POST_FEED_BY_GROUP_URL + group_id;
        else
            getUrl = import.meta.env.VITE_GET_POST_FEED_URL;
    }
    const response = await axios.get(getUrl, {
        withCredentials: true,
    });

    return (response.data.formatted);
}

const likePost = async (postId: string) => {
    try {
        const putUrl = import.meta.env.VITE_LIKE_POST_URL + postId;
        const response = await axios.put(putUrl, {
            withCredentials: true,
        });

        return (response.data);
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            notify((err.response?.data as { message: string }).message, "error");
        }
        return (null);
    }
}

const deletePost = async (postId: string) => {
    try {
        const deleteUrl = import.meta.env.VITE_DELETE_POST_URL + postId;
        const response = await axios.delete(deleteUrl, {
            withCredentials: true,
        });

        notify("Post deleted successfully", "success");
        return (response.data);
   } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            notify((err.response?.data as { message: string }).message, "error");
        }
        return (null);
   }
}

export { createPost, getPostFeed, likePost, deletePost };
