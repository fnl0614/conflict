import { useTranslation } from "react-i18next"

import { WbGroupItem, MbGroupItem } from "../components/GroupItem";
import CountingList from "../../../shared/components/list/CountingList";
import ListingLayout from "../../../shared/layouts/ListingLayout";


export default function GroupOther() {

	const [t] = useTranslation("global");

	const items = [
		{id: 1, name: 'Very Looong group 1', urlProfil: '/images/group1.jpg', role: 'other'},
		{id: 2, name: 'Short Group 2', urlProfil: '/images/group2.jpg', role: 'other'},
		{id: 3, name: 'Group 3', urlProfil: '/images/group2.jpg', role: 'other'},
		{id: 4, name: 'Group 4', urlProfil: '/images/group1.jpg', role: 'other'},
	]

	const CountingListChildren = () => {
		return (
			<CountingList
				arrayLength={items.length}
				title={t("common-group-friend.other")}
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
