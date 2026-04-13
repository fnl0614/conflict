import { Button, Stack } from "@mui/material";
import { CenteredModal } from "../../../shared/components/ui/CustomModal";
import { useUtils } from "../../../shared/hooks/useUtils";
import PasswordForm from "./form/PasswordForm";
import useGoogleAuthForm from "../hooks/useGoogleAuthForm";

interface AuthModalProps {
    show: boolean;
    setter: (show: boolean) => void;
}

const AuthModalForm = () => {

    const { t } = useUtils();

    const {
		register,
		handleSubmit,
		errors,
		showPassword,
		showConfirmPassword,
		handleClickShowPassword,
		handleClickShowConfirmPassword,
		handleMouseDownPassword,
		handleMouseUpPassword,
		onSubmit,
	} = useGoogleAuthForm();

    return (
        <form onSubmit={ handleSubmit(onSubmit) } noValidate>
			<Stack spacing={2}>
				<PasswordForm
				    register = {register}
					errors = {errors}
					showPassword = {showPassword}
					handleClickShowPassword = {handleClickShowPassword}
					handleMouseDownPassword = {handleMouseDownPassword}
					handleMouseUpPassword = {handleMouseUpPassword}
					label = {t("authentication-page.password")}
					name = {"password"}
				/>
				<PasswordForm
				    register = {register}
					errors = {errors}
					showPassword = {showConfirmPassword}
					handleClickShowPassword = {handleClickShowConfirmPassword}
					handleMouseDownPassword = {handleMouseDownPassword}
					handleMouseUpPassword = {handleMouseUpPassword}
					label = {t("authentication-page.confirmPassword")}
					name = {"confirmPassword"}
				/>
				<Button fullWidth 
					variant="contained"
					type='submit'
					color='secondary_1'
					sx={{ textTransform: 'uppercase', color: 'white'}}
				>{t("authentication-page.signin")}</Button>
			</Stack>
		</form>
    )
}

const AuthModal = ({show, setter}: AuthModalProps) => {

    const { t } = useUtils();
	const title = t("authentication-page.modal.title")
	const bottomText = t("authentication-page.modal.content");

    return (
        <CenteredModal
            open={show}
            setter={setter}
            Content={<AuthModalForm />}
            title={title}
            bottomText={bottomText}
            closingModal={false}
        />
    )
}

export default AuthModal;