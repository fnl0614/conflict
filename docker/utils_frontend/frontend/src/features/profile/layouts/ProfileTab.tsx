import { Box, Paper } from '@mui/material'
import { useParams } from "react-router";
import CustomTab from '../../../shared/components/ui/CustomTab'
import { useTranslation } from 'react-i18next';

export default function ProfileTab() {

	const id = useParams().id ?? '';
    const [t] = useTranslation("global");
	const tabItems = [
		{text: t("profile-page.title"), link: `/users/${id}`},
		{text: t("profile-page.friends"), link: `/users/${id}/friend`},
		{text: t("profile-page.groups"), link: `/users/${id}/group`},
	]
	return (
		<Paper>
			<Box justifyContent={'center'} display={'flex'}>
				<CustomTab
					orientation={'horizontal'}
					itemArray={tabItems}
				/>
			</Box>
		</Paper>
	)
}
