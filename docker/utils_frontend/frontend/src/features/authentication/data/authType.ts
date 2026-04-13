export type SignUpData = {
	firstName: string,
	lastName: string,
    email: string,
    password: string,
	confirmPassword: string
}

export type SignInData = {
    email: string,
    password: string,
}

export type AuthData = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    urlProfil: string,
    urlCover: string,
    status: boolean,
}

export type GoogleAuthPasswordType = {
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string
}
