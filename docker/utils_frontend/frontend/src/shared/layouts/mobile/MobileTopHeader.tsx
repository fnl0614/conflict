import { useAuth } from "../../../features/authentication/context/AuthContext";
import { Box, Toolbar } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import UserAvatar from "../../../features/profile/components/ui/UserAvatar";
import CustomIconBtn from "../../components/ui/CustomIconBtn";

export default function MobileTopHeader(){

	const { userData } = useAuth();
	const iconSize = { width: 30, height: 30};
	const bgColor = 'secondary_1';

	return(
		<>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<UserAvatar id={userData?.id} urlProfil={userData?.urlProfil}/>
				<Box sx={{ flexGrow: 1 }} />
				<Box sx={{ justifyContent: "space-between" }}>
					<CustomIconBtn
						link="/search"
						Icon={SearchIcon}
						size={iconSize}
						bgColor={bgColor}/>
					<CustomIconBtn
						link="/posts"
						Icon={AddCircleIcon}
						size={iconSize}
						bgColor={bgColor}/>
					<CustomIconBtn
						link="/setting"
						Icon={SettingsIcon}
						size={iconSize}
						bgColor={bgColor}/>
				</Box>
			</Toolbar>
		</>
	)
}