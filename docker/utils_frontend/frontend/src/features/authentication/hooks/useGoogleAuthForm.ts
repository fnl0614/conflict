import { useState } from "react";
import { notify } from "../../../shared/utils/notify";
import { useForm } from "react-hook-form";
import { useUtils } from "../../../shared/hooks/useUtils";
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from "../context/AuthContext";
import { getGoogleStatus, signinWithGoogle } from "../services/googleService";
import type { GoogleAuthPasswordType, SignUpData } from "../data/authType";

export type PasswordData = Pick<SignUpData, "password" | "confirmPassword">;

const useGoogleAuthForm = () => {
	const { navigate } = useUtils();
	const { initUserData } = useAuth();
	const [show, setShow] = useState(false);
	const form = useForm<PasswordData>();
	const { register, handleSubmit, formState, control } = form;
	const { errors } = formState;
	const currentPassword = "ST_PWD";

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();

	const handleGoogleResponse = async (token: string) => {
		try {
			const response = await getGoogleStatus(token);
			if (response !== currentPassword) {
				notify("Google authentication successful", "success");
				await initUserData();
				navigate("/home");
			} else {
				setShow(true);
			}
			return response;
		} catch (error) {
			notify("Google authentication failed", "error");
		}
	}

	const googleLogin = useGoogleLogin(
		{
			flow: 'implicit',
			onSuccess: (codeResponse: any) => {
				handleGoogleResponse(codeResponse.access_token);
			  },
			onError: () => notify("Google login failed", "error"),
		}
	);

	const onSubmit = async (data: PasswordData) => {

		console.log("Form data : ", data);
	
		if (data.password !== data.confirmPassword) {
			notify("Passwords do not match", "error");
			return;
		}

		const dataToSend : GoogleAuthPasswordType = {
			currentPassword : currentPassword,
			newPassword : data.password,
			newPasswordConfirm : data.confirmPassword
		}
		
		const result = await signinWithGoogle(dataToSend);
		if (result) {
			notify("The registration was successful", "success");
			console.log("Google Signin response : ", result);
			await initUserData();
			navigate("/home");
		}
	};

	return {
		show,
		setShow,
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
		handleGoogleResponse,
		onSubmit,
		googleLogin
	}
}

export default useGoogleAuthForm;