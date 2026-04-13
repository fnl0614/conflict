import { Stack } from '@mui/material';
import TitleBar from '../../../../shared/components/ui/TitleBar';
import { CustomBtn, MenuBtn } from '../../../../shared/components/ui/CustomButton';
import ImageIcon from '@mui/icons-material/Image';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ViewListIcon from '@mui/icons-material/ViewList';

import { useUtils } from '../../../../shared/hooks/useUtils';
import { useDeleteGroup } from '../../hooks/useGroupSetting';
import { useGroup } from '../../hooks/useGroup';

export default function GroupSettingMenu() {

	const { t } = useUtils();
	const { groupData } = useGroup();
	const groupId = groupData?.group.id || '';
	const { handleDeleteGroup } = useDeleteGroup(groupId);

	const menuItem = [
		{ text: t("group.setting.image"), link: 'image', Icon: ImageIcon },
		{ text: t("group.setting.name"), link: 'name', Icon: BorderColorIcon },
		{ text: t("group.setting.description"), link: 'description', Icon: BorderColorIcon},
		{ text: t("group.setting.management"), link: 'management', Icon: ViewListIcon }
	]

	return (
		<Stack spacing={5} alignItems="center" display={'flex'} direction={'column'} height={'75%'}>
			<TitleBar title={t("group.setting.title")} backLink={`/group/${groupId}`} />
			<Stack
				alignContent='center'
				justifyContent='center'
				spacing={3}
			>
				{
					menuItem.map((item, index) => {
						const { text, link, Icon } = item;
							return (
								<MenuBtn key={index} content={text} link={link} Icon={Icon} />
							)
					})
				}
			</Stack>
			<Stack flexGrow={1}></Stack>
			<CustomBtn title={t("group.setting.delete")} bgColor={'accent_1'} onClick={handleDeleteGroup}/>
		</Stack>
	)
}
