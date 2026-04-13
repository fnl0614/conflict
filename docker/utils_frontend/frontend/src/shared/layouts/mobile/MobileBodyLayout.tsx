import { Outlet, useLocation, useOutletContext } from 'react-router'

export interface MobileBodyLayoutProps{
	Index: React.ElementType,
	path: string,
}

export default function MobileBodyLayoutWithConditions( { Index, path }: MobileBodyLayoutProps ) {

	const { pathname } = useLocation();
	return (
		<>
			{ pathname === path ? <Index /> : null }
			<Outlet context={ useOutletContext() }/>
		</>
	)
}
