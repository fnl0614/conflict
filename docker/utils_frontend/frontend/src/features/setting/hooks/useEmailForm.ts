
import { useForm } from 'react-hook-form';
import type { EmailData } from '../data/settingType';
import { useTranslation } from 'react-i18next';
import { changeEmail } from '../services/settingService';
import { useAuth } from '../../authentication/context/AuthContext';
import { notify } from '../../../shared/utils/notify';

const useEmailForm = () => {
	const [t] = useTranslation("global");

	const form = useForm<EmailData>();
	const { register, handleSubmit, formState, control, reset } = form;
	const { errors } = formState;
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();

    const {userData, setUserData} = useAuth();

	const onSubmit = async (data: EmailData) => {
		const result = await changeEmail(data);
        reset({email: ""});
		if (!result)
            return ;
        const user = result.user;
        setUserData({...userData, email: user.email} as typeof userData);
        notify("Email changed successfully", "success");
	};

	return {
		t,
		register,
		handleSubmit,
		control,
		errors,
		handleMouseDownPassword,
		handleMouseUpPassword,
		onSubmit,
    };
};

export default useEmailForm;
