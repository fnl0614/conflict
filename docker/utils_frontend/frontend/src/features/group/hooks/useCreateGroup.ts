import type { GroupCreateType } from '../data/groupType';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createNewGroup } from '../services/groupInteraction';
import { useMutation } from '@tanstack/react-query';
import { notify } from '../../../shared/utils/notify';

const useCreateGroup = () => {
	const form = useForm<GroupCreateType>();
	const { register, handleSubmit, formState, control } = form;
	const { errors } = formState;
    const [show, setOnShow] = useState(false);

	const {   
		mutate,
		isPending,
		error,
		data,
		status } = useMutation({
		mutationFn: (data : GroupCreateType) => createNewGroup(data),
		onSuccess: () => {
			notify("Group created successfully", "success");
		},
		onError: (error) => {
			notify("Failed to create group: " + (error instanceof Error ? error.message : "Unknown error"), "error");
		}
	});

	const onSubmit = async (data : GroupCreateType) => {
		mutate(data);
		form.reset();
	};

	return {
		register,
		handleSubmit,
        show,
        setOnShow,
		control,
		errors,
		onSubmit,
		isPending,
		error,
		data,
		status
	};
};

export default useCreateGroup;
