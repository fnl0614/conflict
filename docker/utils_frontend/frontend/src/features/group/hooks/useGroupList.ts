import { useQuery } from "@tanstack/react-query";
import { getGroupInvitationList, getJoinedGroupList, getOwnedGroupList } from "../services/groupListing";
import { useAuth } from "../../authentication/context/AuthContext";
import { useState } from "react";
import { getProfileGroupList } from "../services/groupProfileService";
import { getUserProfile } from "../../authentication/services/authService";

const transformGroupList = (groupList : any[], role: string) => {
    return groupList.map((group) => ({
        id: group.group.id,
        name: group.group.name,
        description: group.group.description,
        role: role
    }))
}

type EndpointGroupListType = Awaited<ReturnType<typeof getGroupInvitationList>>;

const transformGroupInvitationList = (groupList : EndpointGroupListType[], role: string) => {
    return groupList.map((group) => ({
        requestId: group.id,
        id: group.group.id,
        name: group.group.name,
        description: group.group.description,
        role: role
    }))
}

const useGroupInvitationList = () => {
    const [ page, setPage ] = useState(0);
    const [ count, setCount ] = useState(10);
    const { data : items, status, error } = useQuery({
		queryKey: ['groupInvitationList', page, count],
		queryFn: () => getGroupInvitationList({ page, count }),
        refetchOnMount: 'always'
	})
    return{
        items,
        status,
        error,
        page,
        setPage,
        count,
        setCount
    };
}

const useGroupJoinedList = () => {
    const [ page, setPage ] = useState(0);
    const [ count, setCount ] = useState(10);
    const { userData } = useAuth();
    const userId = userData?.id || "";

    const { data : items, status, error } = useQuery({
		queryKey: ['groupJoinedList', count, page],
		queryFn: () => getJoinedGroupList({ userId, page, count }),
        refetchOnMount: 'always'
	})
    return{
        items,
        status,
        error,
        page,
        setPage,
        count,
        setCount
    }; 
}

const useGroupOwnedList = () => {
    const [ page, setPage ] = useState(0);
    const [ count, setCount ] = useState(10);
    const { data : items, status, error } = useQuery({
		queryKey: ['groupOwnedList', count, page],
		queryFn: () => getOwnedGroupList({ page, count }),
        refetchOnMount: 'always'
	})
    return{
        items,
        status,
        error,
        page,
        setPage,
        count,
        setCount
    }; 
}

const useGroupUserList = ({userId, initPage = 0, initCount = 10 }: {userId: string, initPage?: number, initCount?: number}) => {
    const [ page, setPage ] = useState(initPage);
    const [ count, setCount ] = useState(initCount);

    const { data : userData, status : userStatus, error : userError } = useQuery({
		queryKey: ['groupUser', count, page, userId],
		queryFn: () => getUserProfile(userId),
        refetchOnMount: 'always'
	});

    const { data : items, status, error } = useQuery({
		queryKey: ['groupUserList', count, page, userId],
		queryFn: () => getProfileGroupList({ userId, page, count }),
        refetchOnMount: 'always'
	})
    return{
        userData,
        userStatus,
        userError,
        items,
        status,
        error,
        page,
        setPage,
        count,
        setCount
    }; 
}

export { 
    transformGroupList,
    transformGroupInvitationList,
    useGroupInvitationList,
    useGroupJoinedList,
    useGroupOwnedList,
    useGroupUserList
}