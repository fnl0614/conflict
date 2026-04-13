import { Box, Paper } from '@mui/material'
import { useParams } from "react-router";
import CustomTab from '../../../shared/components/ui/CustomTab'
import { useTranslation } from 'react-i18next';

import { useUtils } from '../../../shared/hooks/useUtils';

export default function ProfileTab({userId} : {userId: string}) {

    const { t } = useUtils();

	const id = useParams().id ?? '';
    const [t] = useTranslation("global");
	const tabItems = [
<<<<<<< HEAD
		{text: t("profile-page.title"), link: `/users/${userId}`},
		{text: t("profile-page.friends"), link: `/users/${userId}/friend`},
		{text: t("profile-page.groups"), link: `/users/${userId}/group`},
=======
		{text: t("profile-page.title"), link: `/users/${id}`},
		{text: t("profile-page.friends"), link: `/users/${id}/friend`},
		{text: t("profile-page.groups"), link: `/users/${id}/group`},
>>>>>>> main
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
