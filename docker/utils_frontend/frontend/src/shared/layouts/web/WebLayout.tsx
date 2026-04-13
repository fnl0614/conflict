import { Box } from "@mui/material";
import WebHeader from "./WebHeader";

interface WebLayoutProps {
	children: React.ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {

	return (
	<Box sx={{ bgcolor: 'primary_1.main', height: '100%', minHeight: '100vh', margin: 0}}>
		<WebHeader/>
		<Box marginTop={10}>{children}</Box>
	</Box>
	)
}
