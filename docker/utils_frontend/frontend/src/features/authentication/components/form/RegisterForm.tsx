import { Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import PasswordForm from "./PasswordForm";
import LegalChecking from './LegalChecking';

import useRegisterForm from '../../hooks/useRegisterForm';

const RegisterForm = () => {
	const {
		t,
		register,
		handleSubmit,
		errors,
		showPassword,
		showConfirmPassword,
		handleClickShowPassword,
		handleClickShowConfirmPassword,
		handleMouseDownPassword,
		handleMouseUpPassword,
		onSubmit,
		control
	} = useRegisterForm();

	return (
		<form onSubmit={ handleSubmit(onSubmit) } noValidate>
			<Stack spacing={2}>
				<TextField
					id={'firstName'}
					label={t("authentication-page.firstName")}
					type='text'
					autoComplete="name"
					variant="standard"
					{...register("firstName", {
						required: "firstname is required",
						setValueAs: (value) => value.trim()
					})}
					error={!!errors.firstName}
					helperText={errors.firstName?.message}
					fullWidth
				/>

				<TextField
					id={'lastName'}
					label={t("authentication-page.lastName")}
					type='text'
					autoComplete="family-name"
					variant="standard"
					{...register("lastName", {
						required: "The user firstname is required",
						setValueAs: (value) => value.trim()
					})}
					error={!!errors.lastName}
					helperText={errors.lastName?.message}
					fullWidth
				/>
				<TextField
					id={'email'}
					label={t("authentication-page.email")}
					type='email'
					autoComplete="email"
					variant="standard"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: 'Invalid email format'
						},
						setValueAs: (value) => value.trim()
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
					name = {"password"}
				/>
				<PasswordForm
				    register = {register}
					errors = {errors}
					showPassword = {showConfirmPassword}
					handleClickShowPassword = {handleClickShowConfirmPassword}
					handleMouseDownPassword = {handleMouseDownPassword}
					handleMouseUpPassword = {handleMouseUpPassword}
					label = {t("authentication-page.confirmPassword")}
					name = {"confirmPassword"}
				/>
				<LegalChecking control={control} />
				<Button fullWidth 
					variant="contained"
					type='submit'
					endIcon={<LoginIcon />}
					color='secondary_1'
					sx={{ textTransform: 'uppercase', color: 'white'}}
				>{t("authentication-page.signup")}</Button>
			</Stack>
		</form>
	);
}

export default RegisterForm;