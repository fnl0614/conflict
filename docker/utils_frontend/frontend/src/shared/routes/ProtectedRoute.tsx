import { useAuth } from "../../features/authentication/context/AuthContext";
import { Navigate, useLocation } from 'react-router';
import type { ChildrenNodeProps } from "../data/sharedType";

const ProtectedRoute = ({children} : ChildrenNodeProps) => {
	const { userData } = useAuth();
	const location = useLocation();

	if (userData === undefined) {
		return null;
	}
	if (!userData && location.pathname !== '/login' && location.pathname !== '/register')
		return <Navigate to={"/login"}/>;
	if (userData && (location.pathname === '/login' || location.pathname === '/register'))
        return <Navigate to={"/"} />;
	return children;
}

export default ProtectedRoute;