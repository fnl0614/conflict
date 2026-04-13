import { Badge, IconButton, type SxProps, type Theme } from "@mui/material";
import TextsmsIcon from "@mui/icons-material/Textsms";

interface ChatButtonProps{
		link?: string | "#";
		iconSize?: SxProps<Theme>;
		nbNotif?: number;
}

export default function GoToChatButton({ link = "#", iconSize, nbNotif} : ChatButtonProps) {
	return (
		<IconButton href={link}>
			<Badge badgeContent={nbNotif} color="error">
				<TextsmsIcon sx={{...iconSize, color: 'secondary_1.main'}}/>
			</Badge>
		</IconButton>
	)
}
