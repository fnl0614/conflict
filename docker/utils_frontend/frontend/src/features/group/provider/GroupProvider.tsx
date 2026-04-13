import { useParams } from "react-router";
import { GroupContext } from "../context/GroupContext";
import { getGroupData } from "../services/groupProfileService";
import { useQuery } from "@tanstack/react-query";

import type { ChildrenNodeProps } from "../../../shared/data/sharedType";

const GroupProvider = ({children} : ChildrenNodeProps) => {

	const params  = useParams();
	const groupId = params?.id ? params.id as string : '';
	const { data : groupData, status, error } = useQuery({
		queryKey: ['groupData', groupId],
		queryFn: () => getGroupData(groupId),
		refetchOnMount: 'always',
	})
	
	return (
		<GroupContext.Provider 
			value={{
				groupData,
				error,
				status
			}}
		>{children}</GroupContext.Provider>
	)
}

export default GroupProvider;