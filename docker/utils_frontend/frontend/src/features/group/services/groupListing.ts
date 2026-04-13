import axios from "axios";
import type { GroupUserListType } from "../data/groupType";

const getNbGroupInvitation = async () => {
    try {
        const fullUrl = import.meta.env.VITE_GET_NB_GROUP_INVITATION_URL;
        const response = await axios.get(fullUrl, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error getting nb group invitation : ", error);
        return null;
    }
}

const getGroupInvitationList = async ({count, page}: Pick<GroupUserListType, 'count' | 'page'>) => {
    try {
        const fullUrl = import.meta.env.VITE_GET_GROUP_INVITATION_LIST_URL;
        const response = await axios.get(fullUrl, {
            withCredentials: true,
            params: {
                count,
                page
            }
        });
        return response.data.list;
    } catch (error) {
        console.log("Error getting invitation list : ", error);
        return null;
    }
}

const getJoinedGroupList = async ({ userId, count, page } : GroupUserListType) => {
    try {
        const fullUrl = import.meta.env.VITE_GET_JOINED_GROUP_LIST_URL + userId;
        const response = await axios.get(fullUrl, {
            withCredentials: true,
            params: {
                count: count,
                page: page
            }
        });
        return response.data.list;
    } catch (error) {
        console.log("Error getting joined list  : ", error);
        return null;
    }
}

const getOwnedGroupList = async ({count, page}: Pick<GroupUserListType, 'count' | 'page'>) => {
    try {
        const fullUrl = import.meta.env.VITE_GET_OWNED_GROUP_LIST_URL;
        const response = await axios.get(fullUrl, {
            withCredentials: true,
            params: {
                count,
                page
            }
        });
        return response.data.list;
    } catch (error) {
        console.log("Error getting owned group : ", error);
        return null;
    }
}

export {
    getNbGroupInvitation,
    getGroupInvitationList,
    getJoinedGroupList,
    getOwnedGroupList,
}