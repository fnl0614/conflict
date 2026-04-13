import { Paper, Stack, Typography } from "@mui/material";
import UserAvatar from "../../profile/components/ui/UserAvatar";
import { getFullName } from "../../../shared/utils/stringUtils";
import CustomIconBtn from "../../../shared/components/ui/CustomIconBtn";
import MenuIcon from '@mui/icons-material/Menu';
import GoBackBtn from "../../../shared/components/ui/GoBackBtn";

interface ChatMsgHeaderProps {
	id: string;
	urlProfil: string;
	firstName: string;
	lastName: string;
}

export default function ChatMsgHeader({id, urlProfil, firstName, lastName}: ChatMsgHeaderProps

) {
	return (
		<Paper sx={{ padding: 1, bgcolor: 'primary_1.main' }} elevation={1}>
			<GoBackBtn
				btnStyle={{alignSelf: 'flex-start'}}
				iconStyle={{color: '#836FFF', fontSize: 'large'}}
				link='/home'
			/>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
				<UserAvatar 
					id={id}
					urlProfil={urlProfil}
					size={{ width: 80, height: 80 }}
					isNotClickable={true}
				/>
				<Stack>
					<Typography
						variant="h6"
						color="secondary_1"
						fontWeight={'bold'}
					>{getFullName(firstName, lastName)}</Typography>
				</Stack>
				<CustomIconBtn
					size={{width: 24, height: 24}}
					bgColor={"secondary_1"}
					Icon={MenuIcon}/>
			</Stack>
		</Paper>
	)
}
