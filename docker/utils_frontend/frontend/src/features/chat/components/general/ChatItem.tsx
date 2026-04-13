import { Avatar, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { getFullName } from "../../../../shared/utils/stringUtils";
import Badge from '@mui/material/Badge';
import { useNavigate } from "react-router";

export type ChatItemProps = {
	chat: {
		id: string;
		urlProfil: string;
		firstName: string;
		lastName: string;
		msg: string;
		unseen?: boolean;
	}
}

export default function ChatItem({ chat }: ChatItemProps) {

	const navigate = useNavigate();
	const {urlProfil, firstName, lastName, msg, unseen } = chat;

	return (
		<Card sx={{ width: '100%', bgcolor: 'primary_1.main' }}>
			<Stack direction={'row'} alignItems={'center'}>
				<CardActionArea onClick={() => navigate("/chats/chatMsg")}>
					<CardContent>
						<Stack direction={'row'} alignItems={'center'} gap={2} sx={{ width: '100%' }}>
							<Avatar src={urlProfil}/>
							<Stack alignItems={'left'} gap={1} sx={{ flexGrow: 1, minWidth: 10 }}>
								<Typography
									variant='subtitle1'
									color="secondary_1"
									fontWeight={'bold'}
									noWrap
								>{getFullName(firstName, lastName)}</Typography>
								<Typography
									variant='body2'
									fontWeight={'light'}
									color="primary_2"
									noWrap
								>{msg}</Typography>
							</Stack>
							{unseen && <Badge color="error" variant="dot"/>}
						</Stack>
					</CardContent>
				</CardActionArea>
			</Stack>
		</Card>
	)
}
