import { WbGroupItem, MbGroupItem } from "../../components/GroupItem";
import CountingList from "../../../../shared/components/list/CountingList";
import ListingLayout from "../../../../shared/layouts/ListingLayout";
import LoadingCircular from "../../../../shared/components/LoadingCircular";
import CustomErrorPage from "../../../../shared/pages/error/CustomErrorPage";

import { useUtils } from "../../../../shared/hooks/useUtils";
import { useGroupOwnedList } from "../../hooks/useGroupList";

export default function GroupOwnedList() {

	const { t } = useUtils();
	const title = t("group.ownedGroup");
	const { items, status, error } = useGroupOwnedList();

	if (status === "pending")
		return <LoadingCircular />
	if (status === "error" || !items)
		return <CustomErrorPage error={error?.message} />

	return (
		<ListingLayout
			listObj={{
				wbChildren:(<CountingList arrayLength={items.length} title={title}/>),
				mbChildren:(<CountingList arrayLength={items.length} title={title}/>),
				list: {
					items: items,
					resourceName: "group",
					ItemComponent: null
				},
				wbItemComponent: WbGroupItem,
				mbItemComponent: MbGroupItem
			}}
		/>
	)
}
