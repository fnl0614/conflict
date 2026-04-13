import { Stack, Typography, TextField } from "@mui/material";
import useEmailForm from "../../hooks/useEmailForm";
import SaveButton from '../SaveButton';

export default function EmailForm() {
    const {
		t,
		register,
		handleSubmit,
		errors,
		onSubmit,
    } = useEmailForm();

    return (
		<form onSubmit={ handleSubmit(onSubmit) } noValidate>
            <Stack spacing={8} alignItems='center'>
                <TextField
                    id='email'
                    label={t('setting-page.emailTitle')}
                    type='email'
                    autoComplete="email"
                    fullWidth
                    variant="standard"
                    {...register("email", {
                        required: "The email field is required",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: 'Invalid email format'
						}
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ fontStyle: 'italic' }}
                >{t('setting-page.emailInstructions')}
                </Typography>
                <SaveButton
                    type='submit'
                />
            </Stack>
        </form>
    );
}