import { Box } from "@mui/material";
import MobileHeader from "./MobileHeader";

interface MobileLayoutProps {
	children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
	const header = MobileHeader();
	const marginTop = header ? 5 : 0;

	return (
		<Box position={'relative'}>
			<MobileHeader/>
			<Box marginTop={marginTop}>{children}</Box>
		</Box>
	)
}
