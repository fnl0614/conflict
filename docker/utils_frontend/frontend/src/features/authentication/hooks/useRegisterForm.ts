import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SignUpData } from '../data/authType';
import { signup } from '../services/authService';
import { notify } from '../../../shared/utils/notify';
<<<<<<< HEAD
import { useUtils } from '../../../shared/hooks/useUtils';
=======
>>>>>>> main

const useRegisterForm = () => {
	const { t } = useUtils();

<<<<<<< HEAD
	const form = useForm<SignUpData>(
		{
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
				termsAccepted: false,
			},
		}
	);

	const { register, handleSubmit, formState, control, watch, reset } = form;
=======
	const form = useForm<SignUpData>();
	const { register, handleSubmit, formState, control, reset } = form;
>>>>>>> main
	const { errors } = formState;
	const termsAccepted = watch("termsAccepted", false);
	
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

<<<<<<< HEAD
		if (!data.termsAccepted) {
			notify("You must agree to the terms of service and the privacy policy to register.", "error");
			return;
		}

=======
>>>>>>> main
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
		termsAccepted,
	};
};

export default useRegisterForm;
