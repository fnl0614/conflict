// import { useTranslation } from "react-i18next"

import ListingLayout from "../../../shared/layouts/ListingLayout";
import { MbGroupItem, WbGroupItem } from "../../group/components/GroupItem";

export default function SearchGroup() {

	// const [t] = useTranslation("global");

	const items = [
		{id: 1, name: 'Very Looong group 1', urlProfil: '/images/group1.jpg', role: 'waiting'},
		{id: 2, name: 'Short Group 2', urlProfil: '/images/group2.jpg', role: 'join'},
		{id: 3, name: 'Group 3', urlProfil: '/images/group2.jpg', role: 'invitation'},
		{id: 4, name: 'Group 4', urlProfil: '/images/group1.jpg', role: 'quit'},
	]

	return (
		<ListingLayout
			listObj={{
				wbChildren:(null),
				mbChildren:(null),
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
