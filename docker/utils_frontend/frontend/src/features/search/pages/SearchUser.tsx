// import { useTranslation } from "react-i18next";

import ListingLayout from "../../../shared/layouts/ListingLayout";
import { MbFriendItem, WbFriendItem } from "../../friend/components/FriendItem";

export default function SearchUser() {

	// const [t] = useTranslation("global");
	
	const items = [
		{id: 1, role: 'waiting', firstName: 'Alice', lastName: 'In Borderland', urlProfil: '/images/user1.jpg'},
		{id: 2, role: 'friend', firstName: 'Squid', lastName: 'Game', urlProfil: '/images/user2.jpg'},
		{id: 3, role: 'user', firstName: 'Kaiji', lastName: 'Anime', urlProfil: '/images/user3.jpg'},
		{id: 4, role: 'invitation', firstName: 'Log', lastName: 'Horizon', urlProfil: '/images/user3.jpg'},
	]

	return (
		<ListingLayout
			listObj={{
				wbChildren:(null),
				mbChildren:(null),
				list: {
					items: items,
					resourceName: "friend",
					ItemComponent: null
				},
				wbItemComponent: WbFriendItem,
				mbItemComponent: MbFriendItem
			}}
		/>
	)
}