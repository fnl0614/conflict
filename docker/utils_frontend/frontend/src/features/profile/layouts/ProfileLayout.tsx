import { AppBar, Stack } from "@mui/material"
import ProfileHeader from "./ProfileHeader"
import ProfileTab from "./ProfileTab"
import { Outlet, useOutletContext } from "react-router"
import TitleBar from "../../../shared/components/ui/TitleBar"
import { useTranslation } from "react-i18next"

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

    return (
        <Stack spacing={2}>
            <ProfileHeader/>
            <ProfileTab />
            <Outlet context={ useOutletContext() }/>
        </Stack>
    )
}

export { MobileProfileLayout, WebProfileLayout };
