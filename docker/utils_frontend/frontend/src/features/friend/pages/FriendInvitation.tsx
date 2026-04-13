import { MbFriendItem, WbFriendItem }from "../components/FriendItem";
import ListingLayout from "../../../shared/layouts/ListingLayout";
import useFriendListing from "../hooks/useFriendListing";
import CountingListChildren from "../components/CountingListChildren";

export default function FriendInvitation() {

    const {
        t,
        invitationList,
        invitationNb,
        page,
        setPage
    } = useFriendListing();

	return (
		<ListingLayout
			listObj={{
				wbChildren:(<CountingListChildren title={t("common-group-friend.invitations")} requestNb={invitationNb} />),
				mbChildren:(<CountingListChildren title={t("common-group-friend.invitations")} requestNb={invitationNb} />),
                currentPage: page,
                setPage: setPage,
				list: {
					items: invitationList,
					resourceName: "data",
					ItemComponent: null
				},
				wbItemComponent: WbFriendItem,
				mbItemComponent: MbFriendItem
			}}
		/>
	)
}