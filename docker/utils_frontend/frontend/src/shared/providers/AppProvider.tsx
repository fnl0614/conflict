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

export const AppProviders: React.FC<ChildrenNodeProps> = ({ children }) => {
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<LanguageProvider>
				<CustomThemeProvider>
					<QueryClientProvider client={queryClient}>
						<AuthProvider>
							<BrowserRouter>
								{children}
							</BrowserRouter>
						</AuthProvider>
					</QueryClientProvider>
				</CustomThemeProvider>
			</LanguageProvider>
		</GoogleOAuthProvider>
	);
};

export default AppProviders;