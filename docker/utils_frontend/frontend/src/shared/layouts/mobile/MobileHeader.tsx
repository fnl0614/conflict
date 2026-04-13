import { AppBar } from '@mui/material'
import MobileTopHeader from './MobileTopHeader'
import MobileBottomHeader from '../../../features/notification/layouts/MobileBottomHeader'
import { useLocation } from 'react-router-dom';

export default function MobileHeader() {

	const location = useLocation();

	if (location.pathname === '/posts'
		|| location.pathname === '/search'
		|| location.pathname.startsWith('/setting')) {
		return null;
	}

	if (location.pathname === '/home' || location.pathname === '/') {
			return (
			<AppBar position="fixed" sx={{ bgcolor: 'white' }}>
				<MobileTopHeader/>
				<MobileBottomHeader/>
			</AppBar>
		)
	}

		return (
			<AppBar position="fixed" sx={{ bgcolor: 'white'}}>
				<MobileBottomHeader/>
			</AppBar>
		)
}
