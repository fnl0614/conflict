import axios from "axios";
import type { GroupContentType } from "../data/groupType";

const updateGroup = async (data: Partial<GroupContentType>, groupId: string) => {
	try {
		const fullUrl = import.meta.env.VITE_UPDATE_GROUP_URL + groupId;
		const response = await axios.put(fullUrl, data, {
			withCredentials: true
		});
		return (response.data)
	} catch (error) {
		console.log("Error updating group name : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

const deleteGroup = async (groupId : string) => {
	try {
		const fullUrl = import.meta.env.VITE_DELETE_GROUP_URL + groupId;
		const response = await axios.delete(fullUrl, {
			withCredentials: true,
		});
		return (response.data)
	} catch (error) {
		console.log("Error deleting the group : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

const changeGroupImage = async (formData: FormData, groupId: string) => {
	try {
		const fullUrl = import.meta.env.VITE_UPDATE_GROUP_URL + groupId;
		const response = await axios.put(fullUrl, formData, {
			withCredentials: true
		});
		return (response.data)
	} catch (error) {
		console.log("Error changing the group image : ", error);
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
}

export {
    updateGroup,
    deleteGroup,
	changeGroupImage
}
