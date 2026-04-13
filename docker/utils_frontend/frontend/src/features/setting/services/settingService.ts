import { notify } from "../../../shared/utils/notify";
import { type NameData, type EmailData, type PasswordData } from "../../setting/data/settingType";
import axios, { AxiosError } from "axios";

const notifyError = (error: unknown) => {
    const axios_error = error as AxiosError;
    if (axios_error.response) {
        notify((axios_error.response.data as { message: string }).message, "error");
        return (axios_error.response);
    }
    return (null);
} 

const changeName = async (data: NameData) => {
    try {
        const putUserChangeUrl = import.meta.env.VITE_UPDATE_USER_URL;
        const response = await axios.put(putUserChangeUrl, data, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        if (!notifyError(err))
            notify("An error occured when updating name", "error");
        return null;
    }
}

const changeEmail = async (data: EmailData) => {
    try {
        const putUserChangeUrl = import.meta.env.VITE_UPDATE_USER_URL;
        const response = await axios.put(putUserChangeUrl, data, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        if (!notifyError(err))
            notify("An error occured when updating email", "error");
        return null;
    }
}

const changePassword = async (data: PasswordData) => {
    try {
        const putUserChangeUrl = import.meta.env.VITE_UPDATE_PASSWORD_URL;
        const response = await axios.put(putUserChangeUrl, data, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        if (!notifyError(err))
            notify("An error occured when updating password", "error");
        return null;
    }
}

const changeCoverPhoto = async (data: FormData) => {
    try {
        const putUserChangeUrl = import.meta.env.VITE_UPDATE_IMAGE_URL + 'pdc'
        const response = await axios.put(putUserChangeUrl, data, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        if (!notifyError(err))
            notify("An error occured when updating cover photo", "error");
        return (null);
    }
}

const changeProfilePhoto = async (data: FormData) => {
    try {
        const putUserChangeUrl = import.meta.env.VITE_UPDATE_IMAGE_URL + 'pdp'
        const response = await axios.put(putUserChangeUrl, data, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        if (!notifyError(err))
            notify("An error occured when updating profile photo", "error");
        return (null);
    }
}

export { changeName, changeEmail, changePassword, changeCoverPhoto, changeProfilePhoto };
