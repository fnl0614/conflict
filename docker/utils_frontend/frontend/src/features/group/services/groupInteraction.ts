import type { GroupAndUserType, GroupCreateType } from "../data/groupType";
import axios from "axios";

const createNewGroup = async (groupData : GroupCreateType) => {
	try {
		const fullUrl = import.meta.env.VITE_CREATE_GROUP_URL;
		await axios.post(fullUrl, groupData, { withCredentials: true });
	} catch (error) {
		console.log("Error creating new group : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

const acceptGroupInvitation = async (requestId : string) => {
	try {
		const fullUrl = import.meta.env.VITE_ACCEPT_GROUP_INVITATION_URL + requestId;
		await axios.put(fullUrl, { withCredentials: true });
	} catch (error) {
		console.log("Error accepting group invitation : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

const declineGroupInvitation = async (requestId : string) => {
	try {
		const fullUrl = import.meta.env.VITE_DECLINE_GROUP_INVITATION_URL + requestId;
		await axios.put(fullUrl, { withCredentials: true});
	} catch (error) {
		console.log("Error declining group invitation : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

const quitGroup = async (groupId: string) => {
	try {
		const fullUrl = import.meta.env.VITE_QUIT_GROUP_URL + groupId;
		await axios.delete(fullUrl, { withCredentials: true });
	} catch (error) {
		console.log("Error quitting group : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

const sendGroupInvitation = async ({userId, groupId} : GroupAndUserType) => {
	try {
		const fullUrl = import.meta.env.VITE_SEND_GROUP_INVITATION_URL;
		const response = await axios.post(fullUrl, { receiverId: userId, groupId}, {
			withCredentials: true,
		});
		return (response.data)
	} catch (error) {
		console.log("Error sending invitation to group : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

const removeMemberFromGroup = async (data : GroupAndUserType) => {
	try {
		const fullUrl = import.meta.env.VITE_REMOVE_GROUP_MEMBER_URL;
		const response = await axios.post(fullUrl, data, { withCredentials: true });
		return (response.data)
	} catch (error) {
		console.log("Error removing user from group : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

export {
	createNewGroup,
	acceptGroupInvitation,
	declineGroupInvitation,
	quitGroup,
	sendGroupInvitation,
	removeMemberFromGroup
}