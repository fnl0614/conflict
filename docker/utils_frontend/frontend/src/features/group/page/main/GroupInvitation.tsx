import { WbGroupInvitationCardItem, MbGroupInvitationCardItem } from "../../components/GroupItem";
import CountingList from "../../../../shared/components/list/CountingList";
import ListingLayout from "../../../../shared/layouts/ListingLayout";
import LoadingCircular from "../../../../shared/components/LoadingCircular";
import CustomErrorPage from "../../../../shared/pages/error/CustomErrorPage";

import { useUtils } from "../../../../shared/hooks/useUtils";
import { transformGroupInvitationList, useGroupInvitationList } from "../../hooks/useGroupList";

export default function GroupInvitation() {	
	const { t } = useUtils();
	const title = t("common-group-friend.invitations");
	const { items, status, error } = useGroupInvitationList();

	
	if (status === "pending")
		return <LoadingCircular />
	if (status === "error" || !items)
		return <CustomErrorPage error={error?.message} />
	
	const newItems = transformGroupInvitationList(items, 'INVITATION');

	return (
		<ListingLayout
			listObj={{
				wbChildren:(<CountingList arrayLength={newItems.length} title={title}/>),
				mbChildren:(<CountingList arrayLength={newItems.length} title={title}/>),
				list: {
					items: newItems,
					resourceName: "invitationGroup",
					ItemComponent: null
				},
				wbItemComponent: WbGroupInvitationCardItem,
				mbItemComponent: MbGroupInvitationCardItem
			}}
		/>
	)
}
