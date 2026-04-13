import { Stack } from '@mui/material';
import { Outlet } from "react-router";
import DisplaySwitchBtn from '../../../../shared/components/DisplaySwitchBtn';
import { useUtils } from '../../../../shared/hooks/useUtils';
import { useGroup } from '../../hooks/useGroup';

export default function GroupImages() {
	const { groupData } = useGroup();
	const groupId = groupData?.group.id || '';
    const { t } = useUtils();
    const title = t(`group.setting.imageTitle`);
	const items = [
		{ text: t("group.setting.cover"), link: "cover"},
		{ text: t("group.setting.profile"), link: "profile"},
	];

    return (
		<>
			{
                <Stack spacing={4}>
                    <DisplaySwitchBtn title={title} backlink={`/group/${groupId}/setting`} items={items} />
                    <Outlet context={groupId}/>
                </Stack>
			}
		</>
    );
}
