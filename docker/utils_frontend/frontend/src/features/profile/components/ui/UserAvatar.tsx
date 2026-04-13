import { Avatar, IconButton, type SxProps, type Theme } from "@mui/material";

interface UserAvatarProps {
	id? : string;
	urlProfil? : string;
	isNotClickable?: boolean;
	pos?: SxProps<Theme>;
	size?: SxProps<Theme>;
}

export default function UserAvatar({
	id = '', 
	urlProfil = "", 
	isNotClickable = false,
	pos = {position: "relative"},
	size = { width: 60, height: 60 }
}: UserAvatarProps){
	return (
	<IconButton href={ "/users/" + id} disabled={isNotClickable} sx={pos}>
		<Avatar alt="user" sx={size} src={urlProfil}/>
	</IconButton>
  )
}
