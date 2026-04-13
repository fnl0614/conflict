import { Button } from "@mui/material";
import type { customColor } from "../../data/sharedType";
import { Stack, Typography } from "@mui/material"
import type { ElementType } from "react";
import { useNavigate } from "react-router";

interface CustomBtnProps {
	title: string;
	link?: string | undefined;
	bgColor: customColor;
	onClick?: () => void;
	variant?: 'extended' | 'normal';
	loading?: boolean;
    disabled?: boolean;
}

const CustomBtn = ({ 
	bgColor,
	title,
	link,
	onClick,
	variant = "normal",
	loading = false,
	disabled = false 
}: CustomBtnProps) => {
	let btnStyle;
	if (variant === 'extended')
		btnStyle = {color: 'white', fontWeight: 'bold', width: '100%'};
	else
		btnStyle = {
			color: 'white',
			fontWeight: 'bold',
			px: 2,
			py: 1,
			whiteSpace: 'normal',
			wordBreak: 'break-word',
			textAlign: 'center',
		};

	return (
		<Button
			variant='contained'
			color={bgColor}
			sx={btnStyle}
			href={link}
			onClick={onClick}
			disabled={disabled || title === 'Pending'}
            loading={loading}
		>{title}</Button>
  )
}

interface MenuBtnProps {
	content: string;
	link: string;
	Icon: ElementType;
}

const MenuBtn = ({ content, link, Icon }: MenuBtnProps) => {

	const navigate = useNavigate();
	
	return (
		<Stack 
			width={'100%'}
			onClick={() => navigate(link)}
			spacing={2} 
			direction='row'
			sx={{ bgcolor: 'primary_1.main', p: 2, cursor:'pointer'}}
			alignItems={'center'}
		>
			<Icon/>
			<Typography color='primary_2.main'>{content}</Typography>
		</Stack>
	)
}

export { CustomBtn, MenuBtn };