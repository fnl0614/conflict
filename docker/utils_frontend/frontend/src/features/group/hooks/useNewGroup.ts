import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { groupData } from '../data/groupData';

const useNewGroup = () => {
	const [t] = useTranslation("global");

	const form = useForm<groupData>();
	const { register, handleSubmit, formState, control } = form;
	const { errors } = formState;
    const [show, setOnShow] = useState(false);
	const onSubmit = () => {};

	return {
		t,
		register,
		handleSubmit,
        show,
        setOnShow,
		control,
		errors,
		onSubmit,
		};
};

export default useNewGroup;
