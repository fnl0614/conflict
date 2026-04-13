import { useQuery } from "@tanstack/react-query";
import { getFriendsToInvite, getGroupMembers, getGroupRelationToUser } from "../services/groupProfileService";
import type { GroupType } from "../data/groupType";

const transformGroupMembers = (members : any[], groupId: string, adminId: string) => {
    return members
        .filter((member) => member.id !== adminId)
        .map((member) => ({
            member,
            groupId
        }))
}

const useGroupMembers = (groupId : string, page? : number, count? : number, enabled?: boolean) => {
    const { data : items, status: memberStatus, error: memberError } = useQuery({
		queryKey: ['groupMember', groupId, page, count],
		queryFn: () => getGroupMembers(groupId, page, count),
        refetchOnMount: 'always',
        enabled
	})

    return{
        items,
        memberStatus,
        memberError
    };
}

const useFriendsToInvite = () => {
    const { data : items, status, error } = useQuery({
        queryKey: ['friendsToInvite'],
        queryFn: () => getFriendsToInvite(),
        refetchOnMount: 'always'
    })

    return{
        items,
        status,
        error
    };
}

const useCheckIfGroupMember = (groupData : GroupType) => {
    const { id } = groupData.group;

    const { data: member, status, error } = useQuery({
        queryKey: ['relationGroup', id],
        queryFn: () => getGroupRelationToUser(id),
        refetchOnMount: 'always'
    })

    return{
        member,
        status,
        error
    };
}

export {
    transformGroupMembers,
    useGroupMembers,
    useFriendsToInvite,
    useCheckIfGroupMember,
}