import { Box } from "@mui/material";
import { Outlet, useLocation, useOutletContext } from "react-router";
import { MobileProfileLayout, WebProfileLayout } from "../../features/profile/layouts/ProfileLayout";
import WebBodyLayout from "../layouts/web/WebBodyLayout";

export default function Profile(){
	const location = useLocation();
	const screen = useOutletContext();

	return (
		<>
			{
				screen === 'mb' ?
				<Box>
					{ location.pathname.includes("/profile") ? <MobileProfileLayout /> : <Outlet/>}
				</Box> 
				:
				<WebBodyLayout>
					{null}
					<WebProfileLayout />
				</WebBodyLayout>
			}
		</>
	)
}