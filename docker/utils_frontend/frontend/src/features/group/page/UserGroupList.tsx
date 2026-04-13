import { useTranslation } from "react-i18next";

import TitleBar from "../../../shared/components/ui/TitleBar";
import ListingLayout from "../../../shared/layouts/ListingLayout";
import { MbGroupItem, WbGroupItem } from "../components/GroupItem";
import CountingList from "../../../shared/components/list/CountingList";

export default function UserGroupList() {
	const items = [
		{id: 1, name: 'Very Looong group 1', urlProfil: '/images/group1.jpg', role: 'myGroup'},
		{id: 2, name: 'Short Group 2', urlProfil: '/images/group2.jpg', role: 'other'},
		{id: 3, name: 'Group 3', urlProfil: '/images/group2.jpg', role: 'waiting'},
		{id: 4, name: 'Group 4', urlProfil: '/images/group1.jpg', role: 'invitation'},
	]

	const [t] = useTranslation("global");

	const CountingListChildren = () => {
		return (
			<CountingList
				arrayLength={items.length}
				title={t("group.groups")}
			/>
		)
	}

	return (
		<ListingLayout
			listObj={{
				wbChildren: (<CountingListChildren />),
				mbChildren: (
					<>
						<TitleBar title={"User name"} backLink='/' />
						<CountingListChildren />
					</>
				),
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