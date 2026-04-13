import { Box, Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { MbFriendInteraction, WbFriendInteraction } from "../../../friend/components/ui/FriendInteraction";
import GoToChatButton from "../../../chat/components/ui/GoToChatButton";
import CustomIconBtn from "../../../../shared/components/ui/CustomIconBtn";
import {CustomBtn} from "../../../../shared/components/ui/CustomButton";
import { useTranslation } from "react-i18next";

interface ProfileOptProps {
    user_id: string;
	relation?: 'user' | 'friend' | 'self' | string;
}

interface ProfileOptLayoutProps {
	element : {
		mbLeft: React.ReactNode;
		wbLeft: React.ReactNode;
		mbRight: React.ReactNode;
		wbRight: React.ReactNode;
	}
}

const ProfileOptLayout = ({ element } : ProfileOptLayoutProps ) => {
	const { wbLeft, mbLeft, wbRight, mbRight } = element;

	if (!wbLeft || !mbLeft) {
		return (
			<Stack direction='row' justifyContent={'center'}>
				<Box display={{ mobile: 'block', minitablet: 'none', tablet: 'none', laptop: 'none', desktop: 'none' }}>
					{mbRight}
				</Box>
				<Box display={{ mobile: 'none', minitablet: 'block', tablet: 'block', laptop: 'block', desktop: 'block' }}>
					{wbRight}
				</Box>
			</Stack>
		)
	}

	return (
		<Stack direction='row' justifyContent='center' spacing={5} display={'flex'}>
			<Box display={{ mobile: 'block', minitablet: 'none', tablet: 'none', laptop: 'none', desktop: 'none' }}>
				{mbLeft}
			</Box>
			<Box display={{ mobile: 'none', minitablet: 'block', tablet: 'block', laptop: 'block', desktop: 'block' }}>
				{wbLeft}
			</Box>
			<Box display={{ mobile: 'block', minitablet: 'none', tablet: 'none', laptop: 'none', desktop: 'none' }}>
				{mbRight}
			</Box>
			<Box display={{ mobile: 'none', minitablet: 'block', tablet: 'block', laptop: 'block', desktop: 'block' }}>
				{wbRight}
			</Box>
		</Stack>
	)
}

export default function ProfileOpt({ relation: option, user_id }: ProfileOptProps) {

	const iconSize = { width: '25px', height: '25px' }

	const [t] = useTranslation("global");

	const text = [ 
		t("profile-page.add"),
		t("profile-page.remove"),
		t("profile-page.setting"),
		t("profile-page.chat"),
	]

	enum ProfileOptEnum {
		ADD,
		REMOVE,
		SETTING,
		CHAT
	}

	switch(option){
		case 'user':
			return (
				<ProfileOptLayout element={{
					mbLeft: null,
					wbLeft: null,
					mbRight: <MbFriendInteraction type='add' size={iconSize} user_id={user_id} />,
                    wbRight: <WbFriendInteraction type='add' size={iconSize} user_id={user_id} />,
				}} />
			  )
		case 'friend':
			return (
				<ProfileOptLayout element={{
					mbLeft: <GoToChatButton link="#" iconSize={iconSize} />,
					wbLeft: <CustomBtn title={text[ProfileOptEnum.CHAT]} bgColor={"primary_2"} />,
					mbRight: <MbFriendInteraction type='remove' size={iconSize} user_id={user_id} />,
                    wbRight: <WbFriendInteraction type='remove' size={iconSize} user_id={user_id} />,
				}} />)
        case 'self':
			return (
				<ProfileOptLayout element={{
					mbLeft: null,
					wbLeft: null,
					mbRight: <CustomIconBtn link="/setting" Icon={SettingsIcon} size={iconSize} bgColor={"secondary_1"} />,
					wbRight: <CustomBtn link="/setting" title={text[ProfileOptEnum.SETTING]} bgColor={"primary_2"} />
				}} />)
		default:
			return (
				<ProfileOptLayout element={{
					mbLeft: null,
					wbLeft: null,
					mbRight: null,
					wbRight: null
				}} />)
	}
}
