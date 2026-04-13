import { WbGroupItem, MbGroupItem } from "../../components/GroupItem";
import CountingList from "../../../../shared/components/list/CountingList";
import ListingLayout from "../../../../shared/layouts/ListingLayout";
import LoadingCircular from "../../../../shared/components/LoadingCircular";
import CustomErrorPage from "../../../../shared/pages/error/CustomErrorPage";

import { useUtils } from "../../../../shared/hooks/useUtils";
import { transformGroupList, useGroupJoinedList } from "../../hooks/useGroupList";

export default function GroupJoinedList() {

	const { t } = useUtils();
	const title = t("group.joinedGroup");
	const { items, status, error } = useGroupJoinedList();

	if (status === "pending")
		return <LoadingCircular />
	if (status === "error" || !items)
		return <CustomErrorPage error={error?.message} />

	const newItems = transformGroupList(items, 'MEMBER');

	return (
		<ListingLayout
			listObj={{
				wbChildren:(<CountingList arrayLength={newItems.length} title={title}/>),
				mbChildren:(<CountingList arrayLength={newItems.length} title={title}/>),
				list: {
					items: newItems,
					resourceName: "group",
					ItemComponent: null
				},
				wbItemComponent: WbGroupItem,
				mbItemComponent: MbGroupItem
			}}
		/>
	)
}
