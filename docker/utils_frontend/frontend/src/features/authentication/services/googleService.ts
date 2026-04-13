import axios, { AxiosError } from "axios";
import { notify } from "../../../shared/utils/notify";
import { strCapitalize } from "../../../shared/utils/stringUtils";
import type { GoogleAuthPasswordType } from "../data/authType";

const getGoogleStatus = async (token: string) => {
    try {
        const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
        const response = await axios.post(googleAuthUrl, { access: token }, {
            withCredentials: true,
        });
        return response.data.message as string;
    } catch (error) {
        throw new Error("Failed to get Google authentication");
    }
}

const signinWithGoogle = async (data: GoogleAuthPasswordType) => {

	try {
		const signupUrl = import.meta.env.VITE_GOOGLE_SIGNIN_URL;
		const response = await axios.put(signupUrl, data, {
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

export {
    getGoogleStatus,
    signinWithGoogle
}