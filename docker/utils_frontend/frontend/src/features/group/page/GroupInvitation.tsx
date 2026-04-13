import { useTranslation } from "react-i18next"

import { WbGroupItem, MbGroupItem } from "../components/GroupItem";
import CountingList from "../../../shared/components/list/CountingList";
import ListingLayout from "../../../shared/layouts/ListingLayout";

export default function GroupInvitation() {

	const [t] = useTranslation("global");

	const items = [
		{id: 1, name: 'Very Looong group 1', urlProfil: '/images/group1.jpg', role: 'waiting'},
		{id: 2, name: 'Short Group 2', urlProfil: '/images/group2.jpg', role: 'invitation'},
		{id: 3, name: 'Group 3', urlProfil: '/images/group2.jpg', role: 'waiting'},
		{id: 4, name: 'Group 4', urlProfil: '/images/group1.jpg', role: 'invitation'},
	]

	const CountingListChildren = () => {
		return (
			<CountingList
				arrayLength={items.length}
				title={t("common-group-friend.invitations")}
			/>
		)
	}

	return (
		<ListingLayout
			listObj={{
				wbChildren:(<CountingListChildren/>),
				mbChildren:(<CountingListChildren />),
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
