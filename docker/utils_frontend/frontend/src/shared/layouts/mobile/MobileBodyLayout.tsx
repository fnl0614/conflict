import { Stack } from '@mui/material';
import { Outlet, useLocation, useOutletContext } from 'react-router'

export interface MobileBodyLayoutProps{
	Index: React.ElementType,
	path: string,
}

export default function MobileBodyLayoutWithConditions( { Index, path }: MobileBodyLayoutProps ) {

	const { pathname } = useLocation();

	return (
		<Stack paddingTop={2} spacing={2}>
			{ pathname === path ? <Index /> : null }	
			<Outlet context={ useOutletContext() }/>
		</Stack>
	)
}
