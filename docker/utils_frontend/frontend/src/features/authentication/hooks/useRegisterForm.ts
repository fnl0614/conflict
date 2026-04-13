import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SignUpData } from '../data/authType';
import { useTranslation } from 'react-i18next';
import { signup } from '../services/authService';
import { notify } from '../../../shared/utils/notify';

const useRegisterForm = () => {
	const [t] = useTranslation("global");

	const form = useForm<SignUpData>();
	const { register, handleSubmit, formState, control, reset } = form;
	const { errors } = formState;
	
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();

	const onSubmit = async (data: SignUpData) => {

		if (data.password !== data.confirmPassword) {
            notify("Passwords do not match", "error");
			return;
		}

		const result = await signup(data);
		if (result) {
            notify("The registration was successful", "success");
            reset();
        }
	};

	return {
		t,
		register,
		handleSubmit,
		control,
		errors,
		showPassword,
		showConfirmPassword,
		handleClickShowPassword,
		handleClickShowConfirmPassword,
		handleMouseDownPassword,
		handleMouseUpPassword,
		onSubmit,
		};
};

export default useRegisterForm;
