import usePasswordForm from '../../hooks/usePasswordForm';

import { Stack, Typography } from '@mui/material';
import PasswordField from '../../../authentication/components/form/PasswordForm';
import SaveButton from '../SaveButton';

const PasswordForm = () => {
	const {
        t,
        register,
        handleSubmit,
        errors,
        showPassword,
        showNewPassword,
        showConfirmPassword,
        handleClickShowPassword,
        handleClickShowNewPassword,
        handleClickShowConfirmPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        onSubmit,
	} = usePasswordForm();

	return (
		<form onSubmit={ handleSubmit(onSubmit) } noValidate>
			<Stack spacing={3} alignItems='center'>
				<PasswordField
				    register = {register}
					errors = {errors}
					showPassword = {showPassword}
					handleClickShowPassword = {handleClickShowPassword}
					handleMouseDownPassword = {handleMouseDownPassword}
					handleMouseUpPassword = {handleMouseUpPassword}
					label = {t("setting-page.currentPassword")}
					name = "currentPassword"
				/>
				<PasswordField
				    register = {register}
					errors = {errors}
					showPassword = {showNewPassword}
					handleClickShowPassword = {handleClickShowNewPassword}
					handleMouseDownPassword = {handleMouseDownPassword}
					handleMouseUpPassword = {handleMouseUpPassword}
					label = {t("setting-page.newPassword")}
					name = "newPassword"
				/>
				<PasswordField
				    register = {register}
					errors = {errors}
					showPassword = {showConfirmPassword}
					handleClickShowPassword = {handleClickShowConfirmPassword}
					handleMouseDownPassword = {handleMouseDownPassword}
					handleMouseUpPassword = {handleMouseUpPassword}
					label = {t("setting-page.confirmPassword")}
					name = "newPasswordConfirm"
				/>
                <Typography
                    variant="body1"
                    align="justify"
                    alignSelf='center'
                    sx={{ fontStyle: 'italic' }}
                >{t('setting-page.passwordInstructions')}
                </Typography>
                <SaveButton type='submit'/>
			</Stack>
		</form>
	);
}

export default PasswordForm;