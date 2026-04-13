import ImageIcon from '@mui/icons-material/Image';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ViewListIcon from '@mui/icons-material/ViewList';
import GroupSettingMenu from './GroupSettingMenu';
import { BodyLayoutWithConditions } from '../../../../shared/layouts/BodyLayout';

import { useUtils } from '../../../../shared/hooks/useUtils';
import { useDeleteGroup } from '../../hooks/useGroupSetting';

interface GroupSettingProps {
	indexPath: string;
	groupId: string;
}

export default function GroupSetting({ indexPath, groupId }: GroupSettingProps) {
	const { t, navigate } = useUtils();
	const { handleDeleteGroup } = useDeleteGroup(groupId);

	const title = t("group.setting.title");

	const itemArray = [
		{ text: t("group.setting.image"), link: 'image', Icon: ImageIcon },
		{ text: t("group.setting.name"), link: 'name', Icon: BorderColorIcon },
		{ text: t("group.setting.description"), link: 'description', Icon: BorderColorIcon },
		{ text: t("group.setting.management"), link: 'management', Icon: ViewListIcon }
	]

	return (
		<>
			<BodyLayoutWithConditions
				mobileItem={{ Index: GroupSettingMenu, path: indexPath }}
				sidebarItem={{
					title: title,
					items: itemArray,
					upperBtn: {
						title: t("group.setting.goProfile"),
						btnColor: "accent_2",
						onClick: () => navigate(`/group/${groupId}`)
					},
					lowerBtn: {
						title: t("group.setting.delete"),
						btnColor: "accent_1",
						onClick: handleDeleteGroup
					},
					lowerSpace: true,
					tabOrientation: "vertical"
				}}
			/>
		</>)
}