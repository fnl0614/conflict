import { Avatar, IconButton, type SxProps, type Theme } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';

interface CustomAvatarProps {
	id? : string;
	urlProfil? : string;
	isNotClickable?: boolean;
	pos?: SxProps<Theme>;
	size?: SxProps<Theme>;
	variant?: 'user' | 'group';
	shape?: 'square' | 'circular';
}

const SquareAvatarItem = ({
	urlProfil = "", 
	size = { width: 60, height: 60 },
	shape = 'circular',
	variant = 'user'
} : CustomAvatarProps) => {

	if (!urlProfil)
		return <div className="w-full h-50 object-cover">
			<Avatar alt={variant} sx={size} variant={shape}>
				{variant === 'user' ? null : <GroupsIcon sx={{...size, padding: 5}} />}
			</Avatar>
		</div>

	if (variant === 'user')
		return <Avatar alt="user" sx={size} src={urlProfil} variant={shape}/>;

	return (
		<Avatar alt="group" sx={size} src={urlProfil} variant={shape}>
			<GroupsIcon sx={{...size, padding: 5}} />
		</Avatar>
	)
	
}

export default function CustomAvatar({
	id = '', 
	urlProfil = "", 
	isNotClickable = false,
	pos = {position: "relative"},
	size = { width: 60, height: 60 },
	variant = 'user',
	shape = 'circular'
}: CustomAvatarProps){

	const link = variant === 'user' ? "/users/" + id : "/group/" + id;

	const Icon = variant === 'user' ? null : <GroupsIcon sx={{... size, padding: 5}} />

	return (
		<IconButton href={link} disabled={isNotClickable} sx={pos}>
			<Avatar alt={variant} sx={size} src={urlProfil} variant={shape}>
				{Icon}
			</Avatar>
		</IconButton>
	)
}

export { SquareAvatarItem }
