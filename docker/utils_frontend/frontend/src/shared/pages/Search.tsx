import { useTranslation } from "react-i18next";

import { Outlet, useOutletContext } from "react-router";
import { Stack } from "@mui/material";
import WebBodyLayout from "../layouts/web/WebBodyLayout";
import CustomSideBar from "../layouts/web/CustomSideBar";
import DisplaySwitchBtn from "../components/DisplaySwitchBtn";

export default function Search() {
	const [t] = useTranslation("global");
	const title = t(`search-page.title`);
	const items = [
		{ text: t("search-page.post"), link: "/search/posts"},
		{ text: t("search-page.group"), link: "/search/groups"},
		{ text: t("search-page.user"), link: "/search/users"},
	]

	const screen = useOutletContext();

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
						/>
					<Outlet />
				</WebBodyLayout>

			}
		</>
	)
}