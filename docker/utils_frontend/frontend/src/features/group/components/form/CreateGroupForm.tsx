import { Stack, TextField } from '@mui/material';
import { MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from '../../../../shared/data/constant';
import { SubmitCreateBtn } from '../ui/GroupBtn';

import useCreateGroup from '../../hooks/useCreateGroup';
import { useUtils } from '../../../../shared/hooks/useUtils';

const CreateGroupForm = () => {

	const {
		handleSubmit,
		onSubmit,
		register,
		errors,
		isPending,
	} = useCreateGroup();

	const { t } = useUtils();

	return (
		<form onSubmit={ handleSubmit(onSubmit) } noValidate>
			<Stack spacing={2}>
				<TextField
					id="group-name"
					autoComplete='off'
					label={t("group.setting.name")}
					{...register("name", {
						required: "The group name is required",
						maxLength: { 
							value: MAX_NAME_LENGTH,
							message: `The name cannot exceed ${MAX_NAME_LENGTH} characters`
						},
						setValueAs: (value) => value.trim()
					})}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					id="group-description"
					autoComplete='off'
					multiline
					minRows={1}
					maxRows={5}
					label={t("group.setting.description")}
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
				/>
				<SubmitCreateBtn isPending={isPending} title={t("group.submit")} />
			</Stack>
		</form>
	)
}

export default CreateGroupForm;