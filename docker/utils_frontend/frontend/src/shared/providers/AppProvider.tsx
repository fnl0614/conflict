import { BrowserRouter } from 'react-router-dom';
import type { ChildrenNodeProps } from '../data/sharedType';
import AuthProvider from '../../features/authentication/context/AuthContext';
import LanguageProvider from '../../features/language/provider/LanguageProvider';
import CustomThemeProvider from './ThemeProvider';

import { GoogleOAuthProvider } from '@react-oauth/google';
// import { useRef, useEffect } from 'react';

// const GoogleOAuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// 	const initialized = useRef(false);
	
// 	useEffect(() => {
// 		// This prevents the multiple initialization warning in Strict Mode
// 		if (!initialized.current && window.google?.accounts?.id) {
// 			initialized.current = true;
// 		}
// 	}, []);
	
// 	return (
// 		<GoogleOAuthProvider clientId={clientId}>
//       {children}
//     </GoogleOAuthProvider>
//   );
// };

export const AppProviders: React.FC<ChildrenNodeProps> = ({ children }) => {
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<LanguageProvider>
				<CustomThemeProvider>
						<AuthProvider>
							<BrowserRouter>
								{children}
							</BrowserRouter>
						</AuthProvider>
				</CustomThemeProvider>
			</LanguageProvider>
		</GoogleOAuthProvider>
	);
};

export default AppProviders;