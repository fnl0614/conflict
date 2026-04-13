import { useTranslation } from "react-i18next";
import {strCapitalize} from "../../utils/stringUtils";

import { Box } from "@mui/material";
import Logo from "../../components/Logo";
import GoogleAuth from "../../../features/authentication/components/ui/GoogleAuth";
import RegisterForm from "../../../features/authentication/components/form/RegisterForm";

export default function Register(){
    const [t] = useTranslation("global");

    return(
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
    )
}