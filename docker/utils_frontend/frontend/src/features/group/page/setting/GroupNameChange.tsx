import { Stack, TextField, Typography } from '@mui/material';
import TitleBar from '../../../../shared/components/ui/TitleBar';
import SaveButton from '../../../setting/components/SaveButton';

import { useUtils } from '../../../../shared/hooks/useUtils';
import {useGroupSettingForm} from '../../hooks/useGroupSetting';
import { useGroup } from '../../hooks/useGroup';
import { MAX_NAME_LENGTH } from '../../../../shared/data/constant';

const GroupNameForm = () => {
	const { t } = useUtils();
	const { groupData } = useGroup();
	const groupId = groupData?.group.id || '';
	const name = groupData?.group.name || '';
	const {
		register,
		handleSubmit,
		errors,
		onSubmit,
	} = useGroupSettingForm(groupId, { name }, t('group.setting.name'));

	return (
		<form onSubmit={ handleSubmit(onSubmit) } noValidate>
			<Stack spacing={8} alignItems='center'>
				<TextField
					id='name'
					type='text'
					label={t('group.setting.name')}
					autoComplete="family-name"
					variant="standard"
					{...register("name", {
						required: "The group name is required",
						maxLength: {
							value: MAX_NAME_LENGTH,
							message: `The description cannot exceed ${MAX_NAME_LENGTH} characters`
						},
						setValueAs: (value) => value.trim()
					})}
					error={!!errors.name}
					helperText={errors.name?.message}
					fullWidth
				/>
				<Typography
					variant="body1"
					align="center"
					sx={{ fontStyle: 'italic' }}
				>{t('group.setting.nameInstructions')}
				</Typography>
				<SaveButton
					type='submit'
				/>
			</Stack>
		</form>
	);
}

export default function GroupNameChange() {
	const { t } = useUtils();
	const { groupData } = useGroup();
	const groupId = groupData?.group.id || '';

	return (
		<Stack alignItems="center" spacing={4}>
			<TitleBar title={t(`group.setting.name`)} backLink={`/group/${groupId}/setting`} />
			<Stack alignItems="center" spacing={4} sx={{ px: 4 }}>
				<GroupNameForm />
			</Stack>
		</Stack>
	);
}
