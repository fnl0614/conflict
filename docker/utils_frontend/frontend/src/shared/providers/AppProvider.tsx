import { BrowserRouter } from 'react-router-dom';
import type { ChildrenNodeProps } from '../data/sharedType';
import AuthProvider from '../../features/authentication/context/AuthContext';
import LanguageProvider from '../../features/language/provider/LanguageProvider';
import CustomThemeProvider from './ThemeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 1000 * 60 * 60 * 24 
		},
	}
});

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
<<<<<<< HEAD
					<QueryClientProvider client={queryClient}>
=======
>>>>>>> main
						<AuthProvider>
							<BrowserRouter>
								{children}
							</BrowserRouter>
						</AuthProvider>
<<<<<<< HEAD
					</QueryClientProvider>
=======
>>>>>>> main
				</CustomThemeProvider>
			</LanguageProvider>
		</GoogleOAuthProvider>
	);
};

export default AppProviders;