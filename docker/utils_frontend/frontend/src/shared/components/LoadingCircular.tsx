import { CircularProgress, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

interface LoadingProps {
	message?: string,
	color?: "primary" | "secondary" | "error" | "info" | "success" | "warning"
}

export default function LoadingCircular({ message, color = 'primary' }: LoadingProps) {
	return (
		<Stack
			spacing={2}
			sx={{ 
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
			}}>
		  <CircularProgress color={color} />
		  <Typography variant="body1" sx={{ marginLeft: 2 }}>{message}</Typography>
		</Stack>
	);
}
