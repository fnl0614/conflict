import { useTranslation } from "react-i18next";

import { Outlet, useOutletContext } from "react-router";
import { Stack } from "@mui/material";
import WebBodyLayout from "../layouts/web/WebBodyLayout";
import CustomSideBar from "../layouts/web/CustomSideBar";
import DisplaySwitchBtn from "../components/DisplaySwitchBtn";
import NewGroup from "../../features/group/components/NewGroup";
import useNewGroup from "../../features/group/hooks/useNewGroup";

export default function Groups() {
	const [t] = useTranslation("global");
	const title = t(`group.groups`);
	const items = [
		{ text: t("common-group-friend.invitations"), link: "/groups/invitation"},
		{ text: t("group.myGroups"), link: "/groups/list"},
		{ text: t("common-group-friend.other"), link: "/groups/other"}
	]

	const screen = useOutletContext();

	const { show, setOnShow } = useNewGroup();

	return (
		<>
			{
				screen === 'mb' ?
				<Stack paddingTop={2} spacing={2}>
					<DisplaySwitchBtn title={title} items={items} />
					<Outlet />
				</Stack>
				: 
				<WebBodyLayout>
						<CustomSideBar
							title={title}
							items={items}
							tabOrientation={"vertical"}
							upperBtn={{
								title: t("group.createGroup"),
								btnColor: "primary_2",
								onClick: () => { setOnShow(!show) }
							}}
							popUp={{
								children: <NewGroup />,
								isVisible: show,
								setIsVisible: setOnShow
							}}
						/>
					<Outlet />
				</WebBodyLayout>

			}
		</>
	)
}
