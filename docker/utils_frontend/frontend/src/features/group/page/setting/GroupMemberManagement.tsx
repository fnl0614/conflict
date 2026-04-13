import { Stack } from "@mui/material";
import CountingList from "../../../../shared/components/list/CountingList";
import RegularList from "../../../../shared/components/list/RegularList";
import TitleBar from "../../../../shared/components/ui/TitleBar";

import { useUtils } from "../../../../shared/hooks/useUtils"
import { GroupMemberItem } from "../../components/GroupMemberItem";
import { useGroup } from "../../hooks/useGroup";
import { transformGroupMembers, useGroupMembers } from "../../hooks/useGroupProfile";
import { RenderGroupState } from "../../components/RenderGroupState";
import LoadingCircular from "../../../../shared/components/LoadingCircular";
import { useAuth } from "../../../authentication/context/AuthContext";

const GroupMemberManagement = () => {
	const { t } = useUtils();
	const { userData } = useAuth();
	const { groupData, status, error } = useGroup();
	const groupId = groupData?.group.id || '';
	const { items, memberStatus, memberError } = useGroupMembers(groupId|| '', 0, 10);

	if (status != 'success' || !groupData) {
		return <RenderGroupState status={status} groupData={groupData} error={error} />;
	}

	if (memberStatus === 'error')
		return <div>Error loading group members: {memberError?.message}</div>;
	if (memberStatus === 'pending')
		return <LoadingCircular/>;

	const newItems = transformGroupMembers(items, groupId, userData?.id || '');

	return (
		<Stack
			spacing={2}
			display={'flex'}
			alignItems={'center'}
			width={'100%'}
		>
			<TitleBar
				title={t(`group.setting.management`)} 
				backLink={`/group/${groupId}/setting`} 
			/>
			<CountingList
				arrayLength={newItems.length}
				title={t("group.interaction.member")}
			/>
			<Stack 
				minWidth={{ mobile: '75%', minitablet: '50%', tablet: '50%', laptop: '50%', desktop: '50%'}}
			>
				<RegularList
					items={newItems}
					resourceName={"memberGroup"}
					ItemComponent={GroupMemberItem}
				/>
			</Stack>
		</Stack>
	)
}

export default GroupMemberManagement;