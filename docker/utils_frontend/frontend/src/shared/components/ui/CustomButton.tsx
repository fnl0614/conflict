import { Button } from "@mui/material";
import type { customColor } from "../../data/sharedType";
import Popover from '@mui/material/Popover';
import { useState } from "react";

interface CustomBtnProps {
	title: string;
	link?: string | undefined;
	bgColor: customColor;
	onClick?: () => void;
	popOver?: {
		children: React.ReactNode;
	};
    loading?: boolean;
    disabled?: boolean;
}

const CustomLargeBtn = ({ bgColor, title, link, onClick, loading = false, disabled = false }: CustomBtnProps) => {
	return (
		<Button
			variant='contained'
			color={bgColor}
			sx={{ color: 'white', width: '100%'}}
			href={link}
			onClick={onClick}
            disabled={disabled || title === 'Pending'}
            loading={loading}
		>{title}</Button>
	)
}

const CustomBtn = ({ bgColor, title, link, onClick }: CustomBtnProps) => {

	const btnStyle = {color: 'white', fontWeight: 'bold', px: 2, py: 1};

  return (
		<Button
			variant='contained'
			color={bgColor}
			sx={btnStyle}
			href={link}
			onClick={onClick}
		>{title}</Button>
  )
}

/*Note: Test of popover button*/

const CustomPopBtn = ({ bgColor, title, link, popOver }: CustomBtnProps) => {

	const btnStyle = {color: 'white', fontWeight: 'bold', px: 2, py: 1};

	const { children } = popOver || { anchorEl: null, open: false };

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	  };
	
	  const handleClose = () => {
		setAnchorEl(null);
	  };

  return (
	<>
		<Button
			variant='contained'
			color={bgColor}
			sx={btnStyle}
			href={link}
			onClick={handleClick}
		>{title}</Button>
		{ popOver && 
		<Popover
			open={Boolean(anchorEl)}
			onClose={handleClose}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'center',
				horizontal: 'center',
			}}
		>{children}</Popover>
		}
	</>
  )
}

export { CustomBtn, CustomLargeBtn, CustomPopBtn };