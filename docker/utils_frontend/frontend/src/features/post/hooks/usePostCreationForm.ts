
import { useForm } from 'react-hook-form';
import type { PostCreationData } from '../data/postType';
import { useTranslation } from 'react-i18next';
import { createPost } from '../services/postService';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const usePostCreationForm = (group_id?: string) => {
	const [t] = useTranslation("global");

    const [file, setFile] = useState<File | null>(null);

	const form = useForm<PostCreationData>();
	const { register, handleSubmit, formState, control, reset } = form;
	const { errors } = formState;
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();

    const navigate = useNavigate();

	const onSubmit = async (data: PostCreationData) => {
        const form = new FormData();

        form.append('group_id', group_id ?? '');
        form.append('desc', data.content);
        if (file)
            form.append('file', file);

		const result = await createPost(form);
		if (result) {
			console.log("Creating post ok");
            reset({content: '', image: null});
            navigate('/');
		} else {
			console.log('Creating post failed');
		}
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
        file,
        setFile
    };
};

export default usePostCreationForm;
