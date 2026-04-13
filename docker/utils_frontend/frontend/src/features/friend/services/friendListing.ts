import axios, { AxiosError } from "axios";
import { notify } from "../../../shared/utils/notify";

function errorNotify(error: unknown) {
    const err = error as AxiosError;
    if (err.response) {
        notify((err.response.data as { message: string }).message, "error");
    }
}

const getInvitationList = async (page: number) => {
    try {
        const url = import.meta.env.VITE_GET_INVITATION_LIST_URL;
        const result = await axios.get(url, {
            withCredentials: true,
            params: {
                page: page
            }
        });

        return result.data.friendRequests;
    } catch (error) {
        errorNotify(error);
        return null;
    }
}

const getFriendList = async (page: number) => {
    try {
        const url = import.meta.env.VITE_GET_MY_FRIEND_LIST_URL;
        const result = await axios.get(url, {
            withCredentials: true,
            params: {
                page: page
            }
        });

        return result.data.friendsList;
    } catch (error) {
        errorNotify(error);
        return null;
    }
}

const getFriendListById = async (id: string, screen: unknown, content: "partial" | "all", page: number) => {
    try {
        const url = import.meta.env.VITE_GET_FRIEND_LIST_URL + id;
        let result;
        if (content === "partial") {
            result = await axios.get(url,
                screen === 'mb' ? {
                    params : { page: 0, count: 3 },
                    withCredentials: true
                }
                : {
                    params : { page: 0, count: 6 },
                    withCredentials: true
                }
            );
        } else {
            result = await axios.get(url, {
                    withCredentials: true,
                    params: {
                        page: page
                    }
                }
            );
        }

        return result.data.friendsList;
    } catch (error) {
        errorNotify(error);
        return null;
    }
}

const getUserList = async (page: number) => {
    try {
        const url = import.meta.env.VITE_GET_USER_LIST_URL;
        const result = await axios.get(url, {
            withCredentials: true,
            params: {
                page: page
            }
        });

        return result.data.notFriends;
    } catch (error) {
        errorNotify(error);
        return null;
    }
}

const getNumberRequest = async (type: 'invitation' | 'friend', id?: string) => {
    let url : string;

    switch (type) {
        case 'invitation':
            url = import.meta.env.VITE_GET_INVITATION_NB_URL + id;
            break ;
        case 'friend':
            url = import.meta.env.VITE_GET_FRIEND_NB_URL + id;
            break ;
    }
    try {
        const result = await axios.get(url, {
            withCredentials: true
        });

        return result.data;
    } catch (error) {
        errorNotify(error);
        return null;
    }
}

export { getInvitationList, getFriendList, getUserList, getFriendListById, getNumberRequest };
