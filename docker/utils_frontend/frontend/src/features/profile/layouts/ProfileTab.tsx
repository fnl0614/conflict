import { Box, Paper } from '@mui/material'
import CustomTab from '../../../shared/components/ui/CustomTab'

import { useUtils } from '../../../shared/hooks/useUtils';

export default function ProfileTab({userId} : {userId: string}) {

    const { t } = useUtils();

	const tabItems = [
		{text: t("profile-page.title"), link: `/users/${userId}`},
		{text: t("profile-page.friends"), link: `/users/${userId}/friend`},
		{text: t("profile-page.groups"), link: `/users/${userId}/group`},
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
