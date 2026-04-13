import { useUtils } from "../hooks/useUtils";

import { Outlet, useOutletContext } from "react-router";
import { Stack } from "@mui/material";
import WebBodyLayout from "../layouts/web/WebBodyLayout";
import CustomSideBar from "../layouts/web/CustomSideBar";
import DisplaySwitchBtn from "../components/DisplaySwitchBtn";
import CreateGroup from "../../features/group/components/CreateGroup";
import useCreateGroup from "../../features/group/hooks/useCreateGroup";
import AddIcon from '@mui/icons-material/Add';

export default function Groups() {
	const { t } = useUtils();
	const title = t(`group.groups`);
	const items = [
		{ text: t("common-group-friend.invitations"), link: "/groups/invitation"},
		{ text: t("group.joinedGroup"), link: "/groups/joined"},
		{ text: t("group.ownedGroup"), link: "/groups/owned"}
	]

	const screen = useOutletContext();

	const { show, setOnShow } = useCreateGroup();

	return (
		<>
			{
				screen === 'mb' ?
				<Stack paddingTop={2} spacing={2}>
					<DisplaySwitchBtn
						title={title}
						items={items}
						Icon={AddIcon}
						IconOnclick={() => { setOnShow(!show) }}
					/>
					<CreateGroup show={show} setter={setOnShow}/>
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
						Node={<CreateGroup show={show} setter={setOnShow}/>}
					/>
					<Outlet />
				</WebBodyLayout>

			}
		</>
	)
}
