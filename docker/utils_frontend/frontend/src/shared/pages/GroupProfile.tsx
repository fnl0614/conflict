import { Outlet, useLocation, useOutletContext } from "react-router";
import { Box } from "@mui/material";
import WebBodyLayout from "../layouts/web/WebBodyLayout";
import { MobileGroupProfileLayout, WebGroupProfileLayout } from "../../features/group/layouts/GroupProfileLayout";
import GroupProvider from "../../features/group/provider/GroupProvider";

const GroupProfile = () => {
	const location = useLocation();
	const screen = useOutletContext();

	return (
		<GroupProvider>
			{
				screen === 'mb' ?
				<Box>
					{ location.pathname.includes("/profile") ? <MobileGroupProfileLayout /> : <Outlet/>}
				</Box> 
				:
				<WebBodyLayout>
					{null}
					<Box minWidth={800} maxWidth={1200} margin={'auto'}><WebGroupProfileLayout /></Box>
				</WebBodyLayout>
			}
		</GroupProvider>
	)
}

export default GroupProfile;