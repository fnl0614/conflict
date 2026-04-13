import { Badge, IconButton, type SxProps, type Theme } from "@mui/material";
import type { customColor } from "../../../../shared/data/sharedType";

interface CustomIconBtnProps {
	size: SxProps<Theme>;
	bgColor: customColor;
	Icon: React.ElementType;
	link?: string | undefined;
	onClick?: () => void;
	nbNotif: number;
}

const CustomIconBtnWithBadge = ({ size, bgColor, link, onClick, Icon, nbNotif }: CustomIconBtnProps) => {
	const iconStyle = { ...size, color: bgColor + '.main' };

	return (
		<IconButton 
			{...(link && { href: link })}
			onClick={onClick}>
				<Badge badgeContent={nbNotif} color="error">
					<Icon sx={iconStyle}/>
				</Badge>
		</IconButton>
	)
}

export default CustomIconBtnWithBadge;

