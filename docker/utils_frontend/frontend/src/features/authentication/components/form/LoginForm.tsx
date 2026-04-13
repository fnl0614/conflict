import useLoginForm from '../../hooks/useLoginForm';

import { Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import PasswordForm from "./PasswordForm";

const LoginForm = () => {
	const {
		t,
		register,
		handleSubmit,
		errors,
		showPassword,
		handleClickShowPassword,
		handleMouseDownPassword,
		handleMouseUpPassword,
		onSubmit,
	} = useLoginForm();

	return (
		<form onSubmit={ handleSubmit(onSubmit) } noValidate>
			<Stack spacing={2}>
				<TextField
					id='email'
					label={t("authentication-page.email")}
					type='email'
					autoComplete="email"
					variant="standard"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: 'Invalid email format'
						}
					})}
					error={!!errors.email}
					helperText={errors.email?.message}
					fullWidth
				/>
				<PasswordForm
				    register = {register}
					errors = {errors}
					showPassword = {showPassword}
					handleClickShowPassword = {handleClickShowPassword}
					handleMouseDownPassword = {handleMouseDownPassword}
					handleMouseUpPassword = {handleMouseUpPassword}
					label = {t("authentication-page.password")}
					name = "password"
				/>
				<Button fullWidth 
					variant="contained"
					type='submit'
					endIcon={<LoginIcon />}
					color='secondary_1'
					sx={{ textTransform: 'uppercase', color: 'white'}}
				>{t("authentication-page.login")}</Button>
			</Stack>
		</form>
	);
}

export default LoginForm;