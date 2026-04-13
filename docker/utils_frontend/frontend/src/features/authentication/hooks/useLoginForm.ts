import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SignInData } from '../data/authType';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';
import { useTranslation } from 'react-i18next';

const useLoginForm = () => {
	const [t] = useTranslation("global");

	const form = useForm<SignInData>();
	const { register, handleSubmit, formState, control } = form;
	const { errors } = formState;
	
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const { initUserData } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data: SignInData) => {
			await login(data);
			await initUserData();
			navigate("/");
	};

	return {
		t,
		register,
		handleSubmit,
		control,
		errors,
		showPassword,
		handleClickShowPassword,
		handleMouseDownPassword,
		handleMouseUpPassword,
		onSubmit,
		};
};

export default useLoginForm;
