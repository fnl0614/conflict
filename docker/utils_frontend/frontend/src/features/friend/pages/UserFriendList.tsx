import TitleBar from "../../../shared/components/ui/TitleBar";
import ListingLayout from "../../../shared/layouts/ListingLayout";
import { MbFriendItem, WbFriendItem } from "../components/FriendItem";
import useProfile from "../../profile/hooks/useProfile";
import CountingListChildren from "../components/CountingListChildren";
import usePartialList from "../../profile/hooks/usePartialList";
import { useTranslation } from "react-i18next";
import type { ListData } from "../data/friendData";

export default function UserFriendList() {

	const [t] = useTranslation("global");
	const { items, nb, page, setPage } = usePartialList("friend", "all");
    const { user } = useProfile();
	const list : ListData[] = [];

	items.forEach(item => {
		list.push({
			request_id: null,
			user_info: {...item, role: 'none'}
		})
	})

	return (
		<ListingLayout
			listObj={{
				wbChildren: (<CountingListChildren title={t("friend.friends")} requestNb={nb} />),
				mbChildren: (
					<>
                        {
                            user ? <TitleBar title={`${user?.firstName}'s friends`} backLink='/' />
                                : <TitleBar title={t("friend.friends")} backLink='/' />
                        }
						<CountingListChildren title={t("friend.friends")} requestNb={nb} />
					</>
				),
				list: {
					items: list,
					resourceName: "data",
					ItemComponent: null
				},
                currentPage: page,
                setPage: setPage,
				wbItemComponent: WbFriendItem,
				mbItemComponent: MbFriendItem
			}}
		/>
	)
}
