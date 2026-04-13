import { useUtils } from "../../hooks/useUtils"

import { Stack, Button, Typography, Paper } from "@mui/material"

interface CustomErrorPageProps {
	error?: string,
	actionToTake?: string,
	status?: number,
	hasButton?: boolean
}

function CustomErrorPage({error, actionToTake = "", status, hasButton = true }: CustomErrorPageProps) {

	const { t, navigate } = useUtils();

	const statusCode = status ? " : " + status : "";
	const errorTitle = t("error-page.title") + statusCode;
	const errorMessage = error || t("error-page.defaultErrorMessage");

	return (
		<Stack
			sx={{
				height: '100vh',
				maxWidth: 800,
				minWidth: 350,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 2,
				marginX: 'auto',
			}}
		
		>
			<Paper elevation={2} sx={{ bgcolor: 'primary_1.main'}}>
				<Stack
					display={"flex"}
					justifyContent="center"
					alignItems="center"
					spacing={5}
					padding={8}
				>
					<Stack spacing={2} alignItems="center" textAlign={'center'}>
						<Typography variant="h3" color="error" fontWeight={'bold'}>{errorTitle}</Typography>
						<Typography variant="h5">{errorMessage}</Typography>
						<Typography variant="body1">{actionToTake}</Typography>
					</Stack>
					{
						hasButton && 
						<Button
							variant="contained"
							size="medium"
							onClick={() => { navigate("/") }}
						>{t("navigation.home")}</Button>
						}
				</Stack>
			</Paper>

		</Stack>
	)
}

export default CustomErrorPage