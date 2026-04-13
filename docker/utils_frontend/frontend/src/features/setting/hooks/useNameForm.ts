
import { useForm } from 'react-hook-form';
import type { NameData } from '../data/settingType';
import { useTranslation } from 'react-i18next';
import { changeName } from '../services/settingService';
import { useAuth } from '../../authentication/context/AuthContext';
import { notify } from '../../../shared/utils/notify';

const useNameForm = () => {
	const [t] = useTranslation("global");

	const form = useForm<NameData>();
	const { register, handleSubmit, formState, control, reset } = form;
	const { errors } = formState;
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();

    const { userData, setUserData } = useAuth();

	const onSubmit = async (data: NameData) => {
		const result = await changeName(data);
        reset({firstName: "", lastName: ""});
		if (!result)
            return ;
        const user = result.user;
        setUserData({...userData,
            firstname: user.firstName,
            lastname: user.lastName} as typeof userData);
        notify("Name changed successfully", "success");
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

export default useNameForm;
