import { Box, Stack, Typography } from "@mui/material";
import UserAvatar from "../../../profile/components/ui/UserAvatar";

export type ChatMsgObjProps = {
	id: string;
	urlProfil: string;
	msg: string;
	position: string;
	time?: string;
}

export default function ChatMsgObj({ id, urlProfil, msg, position, time }: ChatMsgObjProps) {
	return (
		<Stack
			direction={'row'}
			alignItems={'flex-start'}
			sx={{ flexDirection: position === 'right' ? 'row-reverse' : 'row' }}>
				<UserAvatar
					id={id}
					urlProfil={urlProfil}
					size={{ width: 30, height: 30 }}
					isNotClickable={true}
				/>
				<Stack>
					<Box 
						bgcolor='primary_1.main' 
						padding={2}>
						<Typography>{msg}</Typography>
					</Box>
					<Typography variant='caption' sx={{ alignSelf: 'flex-end'}}>{time}</Typography>
				</Stack>
		</Stack>
	)
}
