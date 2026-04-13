export type NameData = {
    firstName: string;
	lastName: string;
}

export type EmailData = {
    email: string;
}

export type PasswordData = {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export type CoverImageData = {
    image: File | null;
}

export type ProfileImageData = {
    image: File | null;
}
