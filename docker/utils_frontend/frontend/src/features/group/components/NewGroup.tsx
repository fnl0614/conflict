import { Stack, Button, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import useNewGroup from '../hooks/useNewGroup';

const NewGroup = () => {
	const {
		t,
		register,
		handleSubmit,
		errors,
		onSubmit,
	} = useNewGroup();

	return (
		<Paper sx={{ bgcolor: 'secondary_2.main', padding: 5}}>
			<form onSubmit={ handleSubmit(onSubmit) } noValidate>
				<Stack spacing={2}>
					<TextField
						id='group'
						label={t('group.name')}
						type='text'
						autoComplete="name"
						fullWidth
						variant="standard"
						{...register("group", {
							required: "The group name is required",
						})}
						error={!!errors.group?.name}
						helperText={errors.group?.name?.message}
					/>
					<Button
						variant="contained"
						type='submit'
						color='secondary_1'
						sx={{ textTransform: 'uppercase', color: 'white'}}
					>{t("group.submit")}</Button>
				</Stack>
			</form>
		</Paper>
	);
}

export default NewGroup;
