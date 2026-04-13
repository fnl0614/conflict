import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { SxProps, Theme } from '@mui/material/styles';

interface GoBackBtnProps{
    btnStyle: SxProps<Theme>,
    iconStyle: SxProps<Theme>,
    link: string;
}
const GoBackBtn = ({ btnStyle, iconStyle, link } : GoBackBtnProps) => {
    return (
        <IconButton sx={btnStyle} href={link}>
            <ArrowBackIcon sx={iconStyle}/>
        </IconButton>
    );
}

export default GoBackBtn;