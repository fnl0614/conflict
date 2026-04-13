import axios from "axios";
import type { GroupType, GroupUserListType } from "../data/groupType";
import type { AuthData } from "../../authentication/data/authType";

    /* User profile */

const getProfileGroupList = async ({userId, count, page} : GroupUserListType) => {
    try {
        const fullUrl = import.meta.env.VITE_GET_PROFILE_GROUP_LIST_URL + userId;
        const response = await axios.get(fullUrl, {
            withCredentials: true,
            params: {
                page,
                count
            }
        });
        return response.data.list;
    } catch (error) {
        console.log("Error getting list of the group of the user profile : ", error);
        return null;
    }
}

    /* Group profile */

const getGroupData = async (groupId : string) => {
    try {
        const fullUrl = import.meta.env.VITE_GET_GROUP_DATA_URL + groupId;
        const response = await axios.get(fullUrl, {
            withCredentials: true,
        });
        return response.data.group as GroupType;
    } catch (error) {
        console.log("Error getting group profile : ", error);
        return null;
    }
}

const getGroupPostFeed = async (groupId: string) => {
    try {
        const fullUrl = import.meta.env.VITE_GET_GROUP_POST_FEED_URL;
        const response = await axios.get(fullUrl, {
            params: { groupId },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error getting group post feed : ", error);
        return null;
    }
}

const getGroupMembers = async (groupId: string, page?: number, count? : number) => {
    try {
        const fullUrl = import.meta.env.VITE_GET_GROUP_MEMBERS_URL + groupId;
        const response = await axios.get(fullUrl, {
            params: { page, count },
            withCredentials: true
        });
        return response.data.users ?? [];
    } catch (error) {
        console.log("Error getting group members : ", error);
        return null;
    }
}

const getGroupRelationToUser = async (groupId: string) => {
    try {
        const fullUrl = import.meta.env.VITE_GET_GROUP_RELATION_TO_USER_URL + groupId;
        const response = await axios.get(fullUrl, {
            withCredentials: true
        });
        return response.data.member;
    } catch (error) {
        console.log("Error getting group relation to user : ", error);
        return null;
    }
}

const getFriendsToInvite = async () => {
    try {
        const fullUrl = import.meta.env.VITE_GET_USER_LIST_URL;
        const response = await axios.get(fullUrl, {
            withCredentials: true
        });
        console.log("Response getFriendsToInvite : ", response);
        const data = response.data.users ?? [];
		return data as Array<AuthData>;
    } catch (error) {
        console.log("Error getting friends to invite : ", error);
        return null;
    }

}

export { 
    getProfileGroupList,
    getGroupData,
    getGroupPostFeed,
    getGroupMembers,
    getGroupRelationToUser,
    getFriendsToInvite
};
