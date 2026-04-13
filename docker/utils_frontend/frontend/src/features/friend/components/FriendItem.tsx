import { Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import UserAvatar from "../../profile/components/ui/UserAvatar";
import GoToChatButton from "../../chat/components/ui/GoToChatButton";
import { MbFriendInteraction, WbFriendInteraction } from "./ui/FriendInteraction";
import { getFullName } from "../../../shared/utils/stringUtils";
import type { RelationalData } from "../data/friendData";
import { useNavigate } from "react-router-dom";

const getType = (role: string | undefined) => {
	switch (role) {
		case 'user':
			return 'add';
		case 'friend':
			return 'remove';
		default:
			return role;
	}
}

const WbFriendItem = ({ data }: RelationalData) => {
	const { request_id, user_info } = data;
	const { id, urlProfil, firstName, lastName, role } = user_info;
    const navigate = useNavigate();

	return (
		<Card sx={{ width: '200px', height: role === 'none' ? '260px' : '350px', bgcolor: 'white'}}>
			<Stack justifyContent={'center'} margin={1}>
				<CardActionArea onClick={() => navigate(`/users/${id}`)}>
					<CardContent sx={{ padding: 0, margin: 0 }}>
						<Stack alignItems={'center'} spacing={1} height={'75%'}>
							<img alt="Profil" src={urlProfil} className="w-full h-50 object-cover"/>
							<Typography variant="h6" color="secondary_1" noWrap>{getFullName(firstName, lastName)}</Typography>
						</Stack>
					</CardContent>
				</CardActionArea>
				{
					role !== 'none' &&
					<CardActions sx={{ width: '100%', height: '100%', justifyContent: 'center'}}>
						<WbFriendInteraction type={getType(role)} user_id={id} request_id={request_id}/>
					</CardActions>
				}
			</Stack>
		</Card>
	)
}

const MbFriendItem = ({ data } : RelationalData) => {
	const iconSize = {width: 24, height: 24};
	const { request_id, user_info } = data;
	const { id, urlProfil, firstName, lastName, role } = user_info;
    const navigate = useNavigate();

	return (
		<Card sx={{ width: '100%', bgcolor: 'primary_1.main' }}>
			<Stack direction={'row'} alignItems={'center'}>
				<CardActionArea sx={{ width: role === 'none' ? '100%' : '75%' }} onClick={() => navigate(`/users/${id}`)}>
					<CardContent>
						<Stack direction={'row'} alignItems={'center'} spacing={1}>
							<UserAvatar 
								id={id}
								urlProfil={urlProfil}
								size={{ width: 40, height: 40 }}
								isNotClickable={true}
							/>
							<Typography variant="h6" color="secondary_1" noWrap>{getFullName(firstName, lastName)}</Typography>
						</Stack>
					</CardContent>
				</CardActionArea>
				{
					role !== 'none' &&
					<CardActions sx={{ width: '25%', justifyContent: 'center'}}>
						{role === 'friend' && <GoToChatButton link="#" iconSize={iconSize}/>}
							<MbFriendInteraction type={getType(role)} size={iconSize} user_id={id} request_id={request_id}/>
					</CardActions>
				}
			</Stack>
		</Card>
	)
}

export { MbFriendItem, WbFriendItem };
