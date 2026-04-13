import { Box, Toolbar } from "@mui/material";
import GoToChatButton from "../../chat/components/ui/GoToChatButton";
import CustomIconBtnWithBadge from "../components/ui/CustomIconBtnWithBadge";

import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function MobileBottomHeader(){

	const iconSize = { width: 30, height: 30};
	const bgColor = 'secondary_1';
	const notifArray = [3, 10, 0, 0, 100];

	return(
		<Box display={{ xs: 'block', md: 'none', lg: 'none'}}>
			<Toolbar sx={{ justifyContent: "space-between", paddingTop: 1 }}>
				<CustomIconBtnWithBadge 
					link="/home"
					Icon={HomeIcon}
					size={iconSize}
					bgColor={bgColor} 
					nbNotif={notifArray[0]}/>
				<CustomIconBtnWithBadge
					link="/groups"
					Icon={GroupsIcon}
					size={iconSize}
					bgColor={bgColor}
					nbNotif={notifArray[1]}/>
				<CustomIconBtnWithBadge
					link="/friends" 
					Icon={PeopleAltIcon}
					size={iconSize}
					bgColor={bgColor}
					nbNotif={notifArray[2]}/>
				<GoToChatButton 
					link='/chats'
					iconSize={iconSize}
					nbNotif={notifArray[3]}/>
				<CustomIconBtnWithBadge
					link="/notifications"
					Icon={NotificationsIcon}
					size={iconSize}
					bgColor={bgColor}
					nbNotif={notifArray[4]}/>
			</Toolbar>
		</Box>
	)
}