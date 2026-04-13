import { Stack } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import useSetting from '../hooks/useSetting';
import TitleBar from '../../../shared/components/ui/TitleBar';
import SettingButton from './SettingButton';
import { CustomBtn } from '../../../shared/components/ui/CustomButton';

export default function SettingMenu() {

	const {
		t,
		handleLogout,
		handleNameChange,
		handleEmailChange,
		handlePasswordChange,
		handleLanguageChange,
		handleImageChange,
		handleTermsOfService,
		handlePrivacyPolicy
		} = useSetting();

	return (
		<Stack spacing={5} alignItems="center">
			<TitleBar title={t("setting-page.mainTitle")} backLink='/home' />
			<Stack alignContent='center' justifyContent='center' spacing={2} sx={{ px: 2, m:2 }}>
				<SettingButton onClick={handleImageChange} Icon={ImageIcon} content={t("setting-page.mainImage")} />
				<SettingButton
					onClick={handleNameChange}
					Icon={BorderColorIcon}
					content={t("setting-page.mainName")}
				/>
				<SettingButton
					onClick={handleEmailChange}
					Icon={EmailIcon}
					content={t("setting-page.mainEmail")}
				/>
				<SettingButton onClick={handlePasswordChange} Icon={LockIcon} content={t("setting-page.mainPassword")} />
				<SettingButton onClick={handleLanguageChange} Icon={LanguageIcon} content={t("setting-page.mainLanguage")} />
				<SettingButton onClick={handleTermsOfService} Icon={DescriptionIcon} content={t("legal.termsOfService.title")} />
				<SettingButton onClick={handlePrivacyPolicy} Icon={DescriptionIcon} content={t("legal.privacyPolicy.title")} />
			</Stack>
			<CustomBtn title={t("setting-page.mainLogout")} bgColor={'accent_1'} onClick={handleLogout}/>
		</Stack>
	)
}
