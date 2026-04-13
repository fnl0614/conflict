import { useUtils } from "../../hooks/useUtils";

import { Box, Stack } from "@mui/material";
import Logo from "../../components/Logo";
import GoogleAuth from "../../../features/authentication/components/ui/GoogleAuth";
import RegisterForm from "../../../features/authentication/components/form/RegisterForm";
import NavigateAuth from "../../../features/authentication/components/ui/NavigateAuth";
import LanguageSelect from "../../../features/language/components/LanguageSelect";

export default function Register(){

	const { t } = useUtils();

    return(
<<<<<<< HEAD
		<>
			<Box position="fixed" top={16} right={16} zIndex={1000}>
				<LanguageSelect />
			</Box>
			<Stack
				display="flex"
				flexDirection={'column'}
				justifyContent="center"
				alignItems="center"
				sx={{ 
					width: '100%',
					minHeight: '100vh',
					overflowX: 'auto'
				}}
				paddingTop={5}
			>
				<Logo/>
				<Stack
					display={'flex'}
					flexDirection={'column'}
					alignItems="center"
					spacing={2}
					sx={{
						minWidth: 350,
						flexGrow: 1,
					}}
				>
					<RegisterForm/>
					<GoogleAuth />
					<Stack>
						<NavigateAuth 
							introduction={t("authentication-page.registerAsk")}
							link={"/login"}
							linkText={t("authentication-page.login")}
						/>
					</Stack>
				</Stack>
			</Stack>
		</>
=======
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			flexDirection={'column'}
			gap={2}
		>
			<Logo/>
			<RegisterForm/>
			<GoogleAuth
				continueString={t("authentication-page.googleOpt")}
				action={t("authentication-page.registerAsk")}
				link="/login"
				linkString={strCapitalize(t("authentication-page.signin"))}
			/>
		</Box>
>>>>>>> main
    )
}