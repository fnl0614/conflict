import useWebHeader from "../../hooks/useWebHeader";
import type { ComponentType } from "react";

import { AppBar, Avatar, Box, Grid, IconButton, Toolbar } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TextsmsIcon from "@mui/icons-material/Textsms";
import Logo from "../../components/Logo";
import SearchBar from "../../../features/search/components/ui/SearchBar";
import CustomIconBtn from "../../components/ui/CustomIconBtn";
import MenuIcon from '@mui/icons-material/Menu';
import { HamburgerMenu, HeaderTabIcon } from "../../../features/notification/layouts/WebTabsHeader";

interface NotificationItem {
	title: string;
	count: number;
	Icon: ComponentType;
	link: string;
  }

export default function WebHeader() {
	const {
		t,
		userData,
		isClicked,
		setIsClicked,
		navigate,
	} = useWebHeader();

	const notifArray : NotificationItem[] = [
		{ title: t("home-page.home"), count: 0, link: "/home", Icon: HomeIcon },
		{ title: t("home-page.groups"), count: 2, link: "/groups", Icon: GroupsIcon },
		{ title: t("home-page.friends"), count: 0, link: "/friends", Icon: PeopleAltIcon },
		{ title: t("home-page.chats"), count: 100, link: "/chats", Icon: TextsmsIcon },
		{ title: t("home-page.notifications"), count: 5, link: "/notifications", Icon: NotificationsIcon },
	];

  return (
	<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} position={'relative'}>
		<AppBar position="fixed" sx={{ bgcolor: 'white' }}>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Grid container alignItems={'center'} sx={{ width: '100%' }}>
					<Grid
						size={{ minitablet: 3, tablet: 3, laptop: 3, desktop: 3}}
						direction={'row'}
						justifyContent={'flex-start'}
						container
						spacing={2}
					>
						<Grid><Logo size="sm"/></Grid>
						<Grid size={6}><SearchBar size="sm" onClick={() => navigate("/search")}/></Grid>
					</Grid>
					<Grid
						size={{ minitablet: 0, tablet: 0, laptop: 6, desktop: 6}}
						justifyContent={'space-evenly'}
						direction={'row'}
						container
					>
						<HeaderTabIcon notifArray={notifArray} />
					</Grid>
					<Grid size={{ minitablet: 6, tablet: 6, laptop: 0, desktop: 0}}></Grid>
					<Grid 
						size={{ minitablet: 3, tablet: 3, laptop: 3, desktop: 3}}
						justifyContent={'flex-end'}
						direction={'row'}
						container
					>
						<Box
							alignContent={'center'}
							display={{ minitablet: 'block', tablet: 'block', laptop: 'none', desktop: 'none' }}
						>
							<CustomIconBtn 
								onClick={() => {setIsClicked(!isClicked)}}
								size={{width: 24, height: 24}} bgColor={"secondary_1"}
								Icon={MenuIcon}/>
						</Box>
						<CustomIconBtn
							onClick={() => navigate("/posts")}
							size={{width: 24, height: 24}} bgColor={"secondary_1"}
							Icon={AddCircleIcon}/>
						<CustomIconBtn 
							onClick={() => navigate("/setting")}
							size={{width: 24, height: 24}} bgColor={"secondary_1"}
							Icon={SettingsIcon}/>
						<IconButton onClick={() => navigate("/users/" + userData?.id)}>
							<Avatar
								alt="user"
								sx={{width: 40, height: 40}}
								src={userData?.urlProfil}/>
							</IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
		{isClicked && <HamburgerMenu notifArray={notifArray} />}
	</Box>
  )
}
