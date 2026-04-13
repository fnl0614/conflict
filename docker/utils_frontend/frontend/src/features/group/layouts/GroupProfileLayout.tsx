import { AppBar, Stack } from "@mui/material"
import GroupProfileHeader from "./GroupProfileHeader"
import { Outlet, useOutletContext } from "react-router"
import TitleBar from "../../../shared/components/ui/TitleBar"
import GroupProfileTab from "./GroupProfileTab"
import { RenderGroupState } from "../components/RenderGroupState"
import { useGroup } from "../hooks/useGroup"

const MobileGroupProfileLayout = () => {
    const outletContext = useOutletContext();
    const { groupData, status, error } = useGroup();

    if (status != 'success' || !groupData) {
        return <RenderGroupState status={status} groupData={groupData} error={error} />;
    }

    return (
        <Stack spacing={2}>
            <AppBar>
                <TitleBar title={groupData.group.name} backLink='/'/>
            </AppBar>
            <GroupProfileHeader groupData={groupData}/>
            <Outlet context={ outletContext }/>
        </Stack>
    )
}

const WebGroupProfileLayout = () => {
    const outletContext = useOutletContext();
	const { groupData, status, error } = useGroup();

	if (status != 'success' || !groupData) {
		return <RenderGroupState status={status} groupData={groupData} error={error} />;
	}


    return (
        <Stack spacing={2}>
            <GroupProfileHeader groupData={groupData}/>
            <GroupProfileTab groupId={groupData.group.id}/>
            <Outlet context={ outletContext }/>
        </Stack>
    )
}

export { MobileGroupProfileLayout, WebGroupProfileLayout };
