import { myTheme } from '../assets/customTheme';
import { ThemeProvider } from '@emotion/react';
import type { ChildrenNodeProps } from '../data/sharedType';

const CustomThemeProvider: React.FC<ChildrenNodeProps> = ({ children }) => {
	return ( 
        <ThemeProvider theme={myTheme}>
            {children}
        </ThemeProvider>
	);
};

export default CustomThemeProvider;