import { Stack, Typography, TextField } from "@mui/material";
import useNameForm from "../../hooks/useNameForm";
import SaveButton from '../SaveButton';

export default function NameForm() {
    const {
		t,
		register,
		handleSubmit,
		errors,
		onSubmit,
    } = useNameForm();

    return (
		<form onSubmit={ handleSubmit(onSubmit) } noValidate>
            <Stack spacing={8} alignItems='center'>
                <TextField
                    id='firstName'
                    label={t('setting-page.firstName')}
                    type='text'
                    autoComplete="first-name"
                    fullWidth
                    variant="standard"
                    {...register("firstName", {
                        required: "The first name is required",
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    id='lastName'
                    type='text'
                    label={t('setting-page.lastName')}
                    autoComplete="family-name"
                    variant="standard"
                    {...register("lastName", {
                        required: "The last name is required",
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    fullWidth
                />
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ fontStyle: 'italic' }}
                >{t('setting-page.nameInstructions')}
                </Typography>
                <SaveButton
                    type='submit'
                />
            </Stack>
        </form>
    );
}