import { Stack } from "@mui/material";
import MobileHeader from "./MobileHeader";

interface MobileLayoutProps {
	children: React.ReactNode;
}

export const MobileSpecialLayout = ({ children }: MobileLayoutProps) => {
	return (
		<Stack display={'flex'} sx={{ width: '100%', height: '100vh', flexDirection: 'column'}} spacing={5}>
			<Stack sx={{ flex: 1, overflowY: 'auto', minHeight: 0}}>{children}</Stack>
		</Stack>
	)
}

export default function MobileLayout({ children }: MobileLayoutProps) {
	return (
		<Stack display={'flex'} sx={{ width: '100%', height: '100vh', flexDirection: 'column'}} spacing={5}>
			<MobileHeader/>
			<Stack sx={{ flex: 1, overflowY: 'auto', minHeight: 0}}>{children}</Stack>
		</Stack>
	)
}
