import { useTranslation } from "react-i18next";

import { Outlet, useOutletContext } from "react-router";
import { Stack } from "@mui/material";
import WebBodyLayout from "../layouts/web/WebBodyLayout";
import CustomSideBar from "../layouts/web/CustomSideBar";
import DisplaySwitchBtn from "../components/DisplaySwitchBtn";

export default function Friends() {
	const [t] = useTranslation("global");
	const title = t(`friend.friends`);
	const items = [
		{ 
			text: t("common-group-friend.invitations"),
			link: "/friends/invitation",
		},
		{ 
			text: t("friend.myFriends"),
			link: "/friends/list",
		},
		{ 
			text: t("common-group-friend.other"),
			link: "/friends/other",
		}
	]

	const screen = useOutletContext();

	return (
		<>
			{
				screen === 'mb' ?
					<Stack paddingTop={2} spacing={2}>
						<DisplaySwitchBtn title={title} items={items} />
						<Outlet context={screen}/>
					</Stack>
				:
				<WebBodyLayout>
					<CustomSideBar
						title={title}
						items={items}
						tabOrientation={"vertical"}
					/>
					<Outlet context={screen}/>
				</WebBodyLayout>
			}
		</>
	)
	}
	