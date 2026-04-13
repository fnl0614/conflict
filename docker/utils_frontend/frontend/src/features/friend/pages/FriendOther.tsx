import { MbFriendItem, WbFriendItem }from "../components/FriendItem";
import ListingLayout from "../../../shared/layouts/ListingLayout";
import useFriendListing from "../hooks/useFriendListing";
import CountingListChildren from "../components/CountingListChildren";

export default function FriendOther() {
    const {
        t,
        userList,
        page,
        setPage
    } = useFriendListing();

	return (
		<ListingLayout
			listObj={{
				wbChildren:(<CountingListChildren title={t("common-group-friend.other")} />),
				mbChildren:(<CountingListChildren title={t("common-group-friend.other")} />),
                currentPage: page,
                setPage: setPage,
				list: {
					items: userList,
					resourceName: "data",
					ItemComponent: null
				},
				wbItemComponent: WbFriendItem,
				mbItemComponent: MbFriendItem
			}}
		/>
	)
}