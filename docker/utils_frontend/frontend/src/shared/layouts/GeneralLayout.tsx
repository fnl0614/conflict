import { Box } from "@mui/material";
import MobileLayout, { MobileSpecialLayout } from "./mobile/MobileLayout";
import WebLayout from "./web/WebLayout";

import { Outlet } from "react-router";
import useScreenMobile from "../hooks/useScreen";
import type { ChildrenNodeProps } from "../data/sharedType";

const GeneralLayout = () => {

	const isMobile = useScreenMobile();

	return (
		<Box sx={{ overflow: 'auto', height: '100vh'}}>
			<Box sx={{ minWidth: 350, height: '100%', minHeight: '100vh'}}>
				{
					isMobile ? 
					<MobileLayout ><Outlet context={'mb'}/></MobileLayout> : 
					<WebLayout ><Outlet context={'wb'}/></WebLayout>
				}
			</Box>
		</Box>
	)
}

const SpecialLayout = ({ children }: ChildrenNodeProps) => {

	const isMobile = useScreenMobile();

	return (
		<Box sx={{ overflow: 'auto', height: '100vh'}}>
			<Box sx={{ minWidth: 350, height: '100%', minHeight: '100vh'}}>
				{
					isMobile ? 
					<MobileSpecialLayout >{children}</MobileSpecialLayout> : children
				}
			</Box>
		</Box>
	)
}

export { GeneralLayout, SpecialLayout };