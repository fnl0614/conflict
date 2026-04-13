import TitleBar from "../../../../shared/components/ui/TitleBar";
import ListingLayout from "../../../../shared/layouts/ListingLayout";
import { MbGroupItem, WbGroupItem } from "../../components/GroupItem";
import CountingList from "../../../../shared/components/list/CountingList";
import LoadingCircular from "../../../../shared/components/LoadingCircular";
import CustomErrorPage from "../../../../shared/pages/error/CustomErrorPage";

import { useUtils } from "../../../../shared/hooks/useUtils";
import { useParams } from "react-router";
import { transformGroupList, useGroupUserList } from "../../hooks/useGroupList";

export default function UserGroupList() {
	const { t } = useUtils();
	const params = useParams();
	const id = params.id? params.id : '';
	const { userData, userStatus, items, status, error } = useGroupUserList({userId: id});
	
	if (status === 'error' || userStatus == 'error' || !userData)
		return <CustomErrorPage error={error?.message} />
	if (status === 'pending' || userStatus == 'pending')
		return <LoadingCircular />;
	
	const { user } = userData;
	const title = t("group.groups");
	const length = items.length;
	const newItems = transformGroupList(items, 'default');
	const name = user.firstName + ' ' + user.lastName;

	return (
		<ListingLayout
			listObj={{
				wbChildren: (
					<CountingList arrayLength={length} title={title}/>
				),
				mbChildren: (
					<>
						<TitleBar title={name} backLink={`/users/${user.id}`}  />
						<CountingList arrayLength={length} title={title}/>
					</>
				),
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