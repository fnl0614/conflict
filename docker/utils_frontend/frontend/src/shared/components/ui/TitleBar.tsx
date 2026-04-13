import { IconButton, Paper, Stack, Typography } from "@mui/material";
import GoBackBtn from './GoBackBtn'

import { type ElementType } from "react";
import useScreenMobile from "../../hooks/useScreen";


export type TitleBarProps = {
	title: string;
	backLink?: string;
	addBackLink?: boolean;
	Icon?: ElementType | null;
	IconOnClick?: () => void;
}

/* 
	UPDATE : 
	Using useOutletContext made a warning to show because outletContext was not determined at some points
	So instead, use the function useScreenMobile to determine whether the screen is mobile or not, and render the GoBackBtn accordingly

	Icon need to have an action IconClick so conditions of rendering was reviewed

*/

export default function TitleBar({ 
	title,
	backLink = "/",
	addBackLink = true,
	Icon = null,
	IconOnClick,
} : TitleBarProps) {
	return(
		<Paper sx={{ width: '100%', position: 'static', minWidth: '350px'}}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' sx={{p: 2}}>
				{
					// useOutletContext() !== 'mb' ? <IconButton sx={{alignSelf: 'flex-start'}} /> :
					useScreenMobile() && addBackLink ?
					<GoBackBtn 
						btnStyle={{ alignSelf: 'flex-start' }}
						iconStyle={{ color: '#836FFF' }}
						link={backLink}
					/> : <IconButton sx={{ alignSelf: 'flex-start' }} />
				}
				<Typography
					variant='h4'
					align='center'
					justifyContent='center'
					color='secondary_1.main'
					sx={{fontWeight: 'bold', textAlign: 'center'}}
					textTransform={'capitalize'}
				>{title}</Typography>
				{/* {Icon ? <Icon /> : <IconButton sx={ {alignSelf: 'flex-end'} }/>} */}
				<IconButton 
					sx={{  alignSelf: 'flex-end' }} 
					onClick={IconOnClick}
				>
					{Icon && <Icon sx={{ color: 'secondary_1.main' }} />}
				</IconButton>
			</Stack>
		</Paper>
	);
}
