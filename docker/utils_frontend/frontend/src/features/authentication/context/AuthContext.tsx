import { createContext, useContext, useState, useEffect } from 'react';
import type { AuthData } from '../data/authType';
import type { ChildrenNodeProps } from '../../../shared/data/sharedType';
import { getLoggedUser } from '../services/authService';

export interface AuthContextType {
	userData: AuthData | null | undefined;
	setUserData: React.Dispatch<React.SetStateAction<AuthData | null | undefined>>;
	initUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined | undefined>(undefined);

const AuthProvider = ({children} : ChildrenNodeProps) => {

	const [userData, setUserData] = useState<AuthData | null | undefined>(undefined);

	const loadUser = async () => {
		setUserData(undefined);
		const response = await getLoggedUser();
		setUserData(response);
	};

	useEffect(() => {
		loadUser();
	}, []);

	const updateUserData: React.Dispatch<React.SetStateAction<AuthData | null | undefined>> = (value) => {
		setUserData((prev) => {
			const newValue = typeof value === 'function' ? value(prev) : value;
			return newValue;
		});
	};

	return (
		<AuthContext.Provider value={{userData, setUserData: updateUserData, initUserData: loadUser}}>{children}</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export default AuthProvider;
