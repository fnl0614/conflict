import axios, { AxiosError } from 'axios';
import type { SignInData, SignUpData } from "../data/authType";
import { notify } from '../../../shared/utils/notify';
import { strCapitalize } from '../../../shared/utils/stringUtils';

const login = async (data: SignInData) => {
	
	try {
		const postSigninUrl = import.meta.env.VITE_SIGNIN_URL;
		console.log("Login post url : ", postSigninUrl);
		const response = await axios.post(postSigninUrl, data, {
            withCredentials: true
        });
		return response.data;
	} catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            if (error.response.status === 500) {
                notify("500 Internal server error", "error");
            } else {
                notify(strCapitalize((error.response.data as {message: string}).message), "error");
            }
        } else {
            notify("An error occurred during login", "error");
        }
		return null;
	}
}

const signup = async (data: SignUpData) => {

	try {
		const signupUrl = import.meta.env.VITE_SIGNUP_URL;
		console.log("Login post url : ", signupUrl);
		const response = await axios.post(signupUrl, data, {
            withCredentials: true
        });
		return (response.data);
	} catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            if (error.response.status === 500) {
                notify("500 Internal server error", "error");
            } else {
                notify(strCapitalize((error.response.data as {message: string}).message), "error");
            }
        } else {
            notify("An error occurred during registration", "error");
        }
		return null;
	}
}

const getUserProfile = async (id: string) => {
	
	try {
		const fullUrl = `${import.meta.env.VITE_GET_USER_PROFILE_URL}/${id}`;
		const response = await axios.get(fullUrl, {
			withCredentials: true
		});
		return response.data;
	} catch (err) {
		console.log("Error getting user profile : ", err);
		return null;
	}
}

const getLoggedUser = async () => {
	try {
		const fullUrl = import.meta.env.VITE_GET_LOGGED_USER_URL;
		const response = await axios.get(fullUrl, {
			withCredentials: true
		});
		console.log("Logged user : ", response.data);
		return  response.data.user;
	} catch (error) {
		if ((error as AxiosError).response && (error as AxiosError).response?.status === 401)
		{
			const refresh = await refreshToken();
			if (refresh) {
				return await getLoggedUser();
			}
			else {
				console.log("Refresh token failed !!!");
			}
		}
		return null;
	}
}

const refreshToken = async () => {
	try {
		const fullUrl = import.meta.env.VITE_REFRESH_TOKEN_URL;
		const response = await axios.get(fullUrl, {
			withCredentials: true
	});
		return response;
	} catch (err) {
		console.log("Refreshing token error : ", err);
		return null;
	}
}

const logout = async () => {
	try {
		const fullUrl = import.meta.env.VITE_GET_LOGOUT_URL;
		const response =  await axios.get(fullUrl, {
			withCredentials: true
		});
		console.log("Logout response : ", response);
		return response;
	} catch (err) {
		console.log("Logout error : ", err);
		return null;
	}
}

export { 
	login,
	logout,
	signup,
	getUserProfile, 
	getLoggedUser,
	refreshToken 
};