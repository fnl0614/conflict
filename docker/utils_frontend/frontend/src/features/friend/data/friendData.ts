export type ProfileData = {
    id: string;
    urlProfil: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'friend' | 'invitation' | 'none';
}

export type ListData = {
    request_id?: string | null;
    user_info: ProfileData;
}

export type RelationalData = {
    data : {
        request_id?: string | null;
        user_info: ProfileData;
    }
}

export type SendRequestData = {
    receiverId: string;
}

export type ErrorData = {
    message: string;
}
