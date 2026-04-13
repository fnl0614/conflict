import axios, { AxiosError } from "axios";
import { notify } from "../../../shared/utils/notify";
import type { SendRequestData, ErrorData } from "../data/friendData"

const acceptFriendRequest = async (id: string) => {
    try {
        const url = import.meta.env.VITE_ACCEPT_FRIEND_REQUEST_URL + id;
        const result = await axios.put(url, {
            withCredentials: true
        });

        return (result.data);
    }
    catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            notify((error.response.data as ErrorData).message, "error");
        }
        return (null);
    }
}

const declineFriendRequest = async (id: string) => {
    try {
        const url = import.meta.env.VITE_DECLINE_FRIEND_REQUEST_URL + id;
        const result = await axios.put(url, {
            withCredentials: true
        });

        return (result.data);
    }
    catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            notify((error.response.data as ErrorData).message, "error");
        }
        return (null);
    }
}

const sendFriendRequest = async (request_body: SendRequestData) => {
    try {
        const url = import.meta.env.VITE_SEND_FRIEND_REQUEST_URL;
        const result = await axios.post(url, request_body,{
            withCredentials: true
        });

        return (result.data);
    }
    catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            notify((error.response.data as ErrorData).message, "error");
        }
        return (null);
    }
}

const removeFriend = async (id: string) => {
    try {
        const url = import.meta.env.VITE_REMOVE_FRIEND_URL;
        const result = await axios.delete(url, {
            withCredentials: true,
            params : {
                idFriend: id
            }
        });

        return (result.data);
    }
    catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            notify((error.response.data as ErrorData).message, "error");
        }
        return (null);
    }
}

const getUserRelation = async (id: string) => {
    try {
        const url = import.meta.env.VITE_GET_USER_RELATION_URL + id;
        const result = await axios.get(url, {
            withCredentials: true
        });
        return (result.data);
    } catch (err) {
        console.error("Failed to get user relation", err);
        return (null);
    }
}

export { acceptFriendRequest, declineFriendRequest, sendFriendRequest, removeFriend, getUserRelation };