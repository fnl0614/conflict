import {strCapitalize} from "../../utils/stringUtils";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";
import GoogleAuth from "../../../features/authentication/components/ui/GoogleAuth";
import LoginForm from "../../../features/authentication/components/form/LoginForm";
import Logo from "../../components/Logo";

export default function Login(){
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
            <LoginForm/>
            <GoogleAuth
                continueString={t("authentication-page.googleOpt")}
                action={t("authentication-page.loginAsk")}
                link="/register"
                linkString={strCapitalize(t("authentication-page.signup"))}
            />
        </Box>
    )
}