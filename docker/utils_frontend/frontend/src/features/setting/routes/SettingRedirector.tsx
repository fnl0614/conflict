import { Navigate, useLocation, useOutletContext } from 'react-router-dom';
import Setting from '../../../shared/pages/Setting';

const SettingRedirector = () => {
	const location = useLocation();
	const screen = useOutletContext()

	const isAtSettingRoot = location.pathname === '/setting';
  
	if (isAtSettingRoot) {
		if (screen == 'mb') {
			return <Setting />;
		} else {
			return <Navigate to="image" replace />;
		}
	}
	return <Setting />;
}

export default SettingRedirector;