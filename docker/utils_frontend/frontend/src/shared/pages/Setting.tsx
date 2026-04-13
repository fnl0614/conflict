import useSetting from '../../features/setting/hooks/useSetting';

import ImageIcon from '@mui/icons-material/Image';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import SettingMenu from '../../features/setting/components/SettingMenu';
import { BodyLayoutWithConditions } from '../layouts/BodyLayout';

export default function Setting() {
	const {
		t,
		handleLogout
	} = useSetting();

	const title = t("setting-page.mainTitle");

	const itemArray = [
		{ text: t("setting-page.mainImage"), link: '/setting/image', Icon: ImageIcon },
		{ text: t("setting-page.mainName"), link: '/setting/name', Icon: BorderColorIcon },
		{ text: t("setting-page.mainEmail"), link: '/setting/email', Icon: EmailIcon },
		{ text: t("setting-page.mainPassword"), link: '/setting/password', Icon: LockIcon },
		{ text: t("setting-page.mainLanguage"), link: '/setting/language', Icon: LanguageIcon },
		{ text: t("setting-page.mainTOS"), link: '/setting/tos', Icon: DescriptionIcon },
	]

	return (
		<>
			<BodyLayoutWithConditions 
				mobileItem={{ Index: SettingMenu, path: '/setting' }}
				sidebarItem={{
					title: title,
					items: itemArray,
					lowerBtn: {
						title: t("setting-page.mainLogout"),
						btnColor: "accent_1",
						onClick: handleLogout
					},
					tabOrientation: "vertical"
				}}
			/>
		</>)
}
