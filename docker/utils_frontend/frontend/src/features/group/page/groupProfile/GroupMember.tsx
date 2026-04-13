import CountingList from "../../../../shared/components/list/CountingList";
import ListingLayout from "../../../../shared/layouts/ListingLayout";
import TitleBar from "../../../../shared/components/ui/TitleBar";
import LoadingCircular from "../../../../shared/components/LoadingCircular";
import { MbGroupMemberDisplayItem, WbGroupMemberDisplayItem } from "../../components/GroupMemberItem";

import { RenderGroupState } from "../../components/RenderGroupState";
import { useUtils } from "../../../../shared/hooks/useUtils";
import { useGroupMembers } from "../../hooks/useGroupProfile";
import { useGroup } from "../../hooks/useGroup";
import CustomErrorPage from "../../../../shared/pages/error/CustomErrorPage";

const GroupMember = () => {
	const { t } = useUtils();
	const { groupData, status, error } = useGroup();

	const groupId = groupData?.group.id;

	const { items, memberStatus, memberError } = useGroupMembers(groupData?.group.id || '', 0, 10, !!groupId);

	if (status != 'success' || !groupData) {
		return <RenderGroupState status={status} groupData={groupData} error={error} />;
	}

	if (memberStatus === 'error')
		return <CustomErrorPage error={memberError?.message} />;
	if (memberStatus === 'pending')
		return <LoadingCircular/>;
	
	const title = t("group.interaction.member");

	return (
		<ListingLayout
			listObj={{
				wbChildren: <CountingList arrayLength={items.length} title={title}/>,
				mbChildren: (
					<>
						<TitleBar title={groupData.group.name} backLink={`/group/${groupData.group.id}`} />
						<CountingList arrayLength={items.length} title={title}/>
					</>
				),
				list: {
					items: items,
					resourceName: "member",
					ItemComponent: null
				},
				wbItemComponent: WbGroupMemberDisplayItem,
				mbItemComponent: MbGroupMemberDisplayItem
			}}
		/>
	)
}

export default GroupMember;