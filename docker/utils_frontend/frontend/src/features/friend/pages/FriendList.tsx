import {MbFriendItem, WbFriendItem }from "../components/FriendItem";
import ListingLayout from "../../../shared/layouts/ListingLayout";
import useFriendListing from "../hooks/useFriendListing";
import CountingListChildren from "../components/CountingListChildren";

export default function FriendList() {

    const {
        t,
        friendList,
        friendNb,
        page,
        setPage
    } = useFriendListing();

	return (
		<ListingLayout
			listObj={{
				wbChildren:(<CountingListChildren title={t("friend.friends")} requestNb={friendNb} />),
				mbChildren:(<CountingListChildren title={t("friend.friends")} requestNb={friendNb} />),
                currentPage: page,
                setPage: setPage,
				list: {
					items: friendList,
					resourceName: "data",
					ItemComponent: null
				},
				wbItemComponent: WbFriendItem,
				mbItemComponent: MbFriendItem
			}}
		/>
	)
}
