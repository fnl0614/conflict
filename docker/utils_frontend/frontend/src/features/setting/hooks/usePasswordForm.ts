import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { PasswordData } from '../data/settingType';
import { useTranslation } from 'react-i18next';
import { changePassword } from '../services/settingService';
import { notify } from '../../../shared/utils/notify';

const usePasswordForm = () => {
	const [t] = useTranslation("global");

	const form = useForm<PasswordData>();
	const { register, handleSubmit, formState, reset } = form;
	const { errors } = formState;
	
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const [showNewPassword, setShowNewPassword] = useState(false);
	const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();

	const onSubmit = async (data: PasswordData) => {
        if (data.newPassword !== data.newPasswordConfirm)
        {
            notify("Passwords doesn't match", "error");
            reset({currentPassword:"", newPasswordConfirm: "", newPassword: ""});
            return ;
        }
		const result = await changePassword(data);
        reset({currentPassword:"", newPasswordConfirm: "", newPassword: ""});
		if (!result)
            return ;
        notify("Password changed successfully", "success");
	};

	return {
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
    };
}

export default usePasswordForm;