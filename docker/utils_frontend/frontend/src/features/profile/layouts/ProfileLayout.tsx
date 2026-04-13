import { AppBar, Stack } from "@mui/material"
import ProfileHeader from "./ProfileHeader"
import ProfileTab from "./ProfileTab"
import TitleBar from "../../../shared/components/ui/TitleBar"
import { useTranslation } from "react-i18next"
<<<<<<< HEAD

import { Outlet, useOutletContext } from "react-router"
import { useAuth } from "../../authentication/context/AuthContext"
=======
>>>>>>> main

const MobileProfileLayout = () => {
    const [t] = useTranslation("global");
    return (
        <Stack spacing={2}>
            <AppBar>
                <TitleBar title={t("profile-page.title")} backLink='/'/>
            </AppBar>
            <ProfileHeader/>
            <Outlet context={ useOutletContext() }/>
        </Stack>
    )
}

const WebProfileLayout = () => {

    const { userData } = useAuth();
    const userId = userData?.id;

    return (
        <Stack spacing={2}>
            <ProfileHeader/>
            <ProfileTab userId={userId ? userId : ''}/>
            <Outlet context={ useOutletContext() }/>
        </Stack>
    )
}

export { MobileProfileLayout, WebProfileLayout };
