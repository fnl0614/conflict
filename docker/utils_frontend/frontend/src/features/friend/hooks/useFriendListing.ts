import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ListData, ProfileData } from "../data/friendData";
import { getUserList, getInvitationList, getFriendList, getNumberRequest } from "../services/friendListing";
import { useAuth } from "../../authentication/context/AuthContext";

interface InvitationData {
    id: string;
    sender: ProfileData;
}
 
const useFriendListing = () => {
    const [t] = useTranslation("global");
    const [loading, setLoading] = useState(true);
    const [invitationList, setInvitationList] = useState<ListData[]>([]);
    const [friendList, setFriendList] = useState<ListData[]>([]);
    const [userList, setUserList] = useState<ListData[]>([]);
    const [friendNb, setFriendNb] = useState<number>(0);
    const [invitationNb, setInvitationNb] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const { userData } = useAuth();

	useEffect(() => {
        async function fetchInvitationList() {
            const result = await getInvitationList(page);
            const request_nb_result = await getNumberRequest('invitation', userData?.id);
            const list: ListData[] = [];

            setLoading(false);
            if (!result || !request_nb_result)
            {
                setInvitationList(list);
                setInvitationNb(0);
                return ;
            }
            result.forEach((content: InvitationData) => {
                list.push({
                    request_id: content.id,
                    user_info: {...content.sender, role: 'invitation'}
                })
            })
            setInvitationList(list);
            setInvitationNb((request_nb_result as { count : number }).count);
        }
        fetchInvitationList();
	}, [page]);

	useEffect(() => {
        async function fetchFriendList() {
            const result = await getFriendList(page);
            const request_nb_result = await getNumberRequest('friend', userData?.id);
            const list: ListData[] = [];

            setLoading(false);
            if (!result || !request_nb_result)
            {
                setFriendList(list);
                setFriendNb(0);
                return ;
            }
            result.forEach((content: ProfileData) => {
                list.push({
                    request_id: null,
                    user_info: {...content, role: 'friend'}
                })
            })
            setFriendNb((request_nb_result as { count : number }).count);
            setFriendList(list);
        }
        fetchFriendList();
	}, [page]);

	useEffect(() => {
        async function fetchUserList() {
            const result = await getUserList(page);
            const list : ListData[] = [];

            setLoading(false);
            if (!result) {
                setUserList(list);
                return ;
            }
            result.forEach((content: ProfileData) => {
                list.push({
                    request_id: null,
                    user_info: {...content, role: 'user'}
                })
            })
            setUserList(list);
        }
        fetchUserList();
	}, [page]);

    return ({
        t,
        loading,
        invitationList,
        friendList,
        userList,
        invitationNb,
        friendNb,
        page,
        setPage
    });
}

export default useFriendListing;