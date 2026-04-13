import { Stack, TextField, Typography } from '@mui/material';
import TitleBar from '../../../../shared/components/ui/TitleBar';
import SaveButton from '../../../setting/components/SaveButton';

import { useUtils } from '../../../../shared/hooks/useUtils';
import {useGroupSettingForm} from '../../hooks/useGroupSetting';
import { useGroup } from '../../hooks/useGroup';
import { MAX_DESCRIPTION_LENGTH } from '../../../../shared/data/constant';

const GroupDescriptionForm = () => {
	const { t } = useUtils();
	const { groupData } = useGroup();
	const groupId = groupData?.group.id || '';
	const description = groupData?.group.description || '';
	const {
		register,
		handleSubmit,
		errors,
		onSubmit,
	} = useGroupSettingForm(groupId, { description }, t('group.setting.description'));

	return (
		<form onSubmit={ handleSubmit(onSubmit) } noValidate>
			<Stack spacing={8} alignItems='center'>
				<TextField
					id='description'
					type='text'
					label={t('group.setting.description')}
					variant="standard"
					{...register("description", {
						required: "The group description is required",
						maxLength: {
							value: MAX_DESCRIPTION_LENGTH,
							message: `The description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`
						},
						setValueAs: (value) => value.trim()
					})}
					error={!!errors.description}
					helperText={errors.description?.message}
					fullWidth
					multiline
				/>
				<Typography
					variant="body1"
					align="center"
					sx={{ fontStyle: 'italic' }}
				>{t('group.setting.descriptionInstructions')}
				</Typography>
				<SaveButton
					type='submit'
				/>
			</Stack>
		</form>
	);
}

export default function GroupDescriptionChange() {
	const { t } = useUtils();
	const { groupData } = useGroup();
	const groupId = groupData?.group.id || '';

	return (
		<Stack alignItems="center" spacing={4}>
			<TitleBar title={t(`group.setting.description`)} backLink={`/group/${groupId}/setting`}  />
			<Stack alignItems="center" spacing={4} sx={{ px: 4 }}>
				<GroupDescriptionForm />
			</Stack>
		</Stack>
	);
}
