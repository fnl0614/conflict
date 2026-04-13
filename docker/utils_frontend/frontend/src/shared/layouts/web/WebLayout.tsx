import { Box } from "@mui/material";
import WebHeader from "./WebHeader";
import Footer from "../Footer";

interface WebLayoutProps {
	children: React.ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {

	return (
		<Box
			sx={{ 
				bgcolor: 'primary_1.main',
				height: '100%',
				minHeight: '100vh',
				margin: 0,
				width: '100%',
				display: 'flex',
				flexDirection: 'column'
		}}>
			<WebHeader/>
			<Box marginTop={5} sx={{ flex: 1, overflowY: 'auto', minHeight: 0}}>{children}</Box>
			<Footer />
		</Box>
	)
}