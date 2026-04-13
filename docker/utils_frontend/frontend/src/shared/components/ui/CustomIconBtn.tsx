import { IconButton, type SxProps, type Theme } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import type { customColor } from "../../data/sharedType";

interface CustomIconBtnProps {
	size?: SxProps<Theme>;
	bgColor: customColor;
	Icon: React.ElementType;
	link?: string | undefined;
	onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export default function CustomIconBtn({ size, bgColor, link, onClick, Icon, loading = false, disabled = false }: CustomIconBtnProps) {

	const iconStyle = { ...size, color: bgColor + '.main' };

	return (
		<IconButton 
			{...(link && { href : link })}
			onClick={onClick}
            disabled={disabled || Icon === HistoryIcon}
            loading={loading}
        >
				<Icon sx={iconStyle}/>
		</IconButton>
	)
}
