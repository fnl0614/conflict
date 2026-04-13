import { useUtils } from "../../hooks/useUtils";

import { Box, Stack } from "@mui/material";
import GoogleAuth from "../../../features/authentication/components/ui/GoogleAuth";
import LoginForm from "../../../features/authentication/components/form/LoginForm";
import Logo from "../../components/Logo";
import Footer from "../../layouts/Footer";
import NavigateAuth from "../../../features/authentication/components/ui/NavigateAuth";
import LanguageSelect from "../../../features/language/components/LanguageSelect";

export default function Login(){
	
	const { t } = useUtils();

	return(
		<>
			<Box position="fixed" top={16} right={16} zIndex={1000}>
				<LanguageSelect />
			</Box>
			<Stack
				display="flex"
				flexDirection={'column'}
				alignItems="center"
				sx={{ 
					width: '100%',
					minHeight: '100vh',
					overflowX: 'auto'
				}}
				paddingTop={10}
			>
				<Logo/>
				<Stack
					display={'flex'}
					flexDirection={'column'}
					justifyContent="start"
					alignItems="center"
					spacing={2}
					sx={{
						minWidth: 350,
						flexGrow: 1,
					}}
				>
					<LoginForm/>
					<GoogleAuth/>
					<Stack>
						<NavigateAuth 
							introduction={t("authentication-page.loginAsk")}
							link={"/register"}
							linkText={t("authentication-page.signup")}
						/>
					</Stack>
				</Stack>
				<Footer position="center"/>
			</Stack>
		</>
	)
}