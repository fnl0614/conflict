import { Box, Paper } from '@mui/material'
import CustomTab from '../../../shared/components/ui/CustomTab'
import { useUtils } from '../../../shared/hooks/useUtils'

export default function GroupProfileTab({ groupId } : { groupId : string}) {
	const { t } = useUtils();
	const tabItems = [
		{ text: t("group.profile-page.profile"), link: `/group/${groupId}/profile` },
		{ text: t("group.profile-page.member"), link: `/group/${groupId}/members` },
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
