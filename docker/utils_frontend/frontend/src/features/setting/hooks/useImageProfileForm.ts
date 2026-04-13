import { useForm } from 'react-hook-form';
import type { ProfileImageData } from '../data/settingType';
import { useState } from 'react';
import { changeProfilePhoto } from '../services/settingService';
import { useAuth } from '../../authentication/context/AuthContext';
import { notify } from '../../../shared/utils/notify';

const useImageCoverForm = () => {
    const [file, setFile] = useState<File | null>(null);

	const form = useForm<ProfileImageData>();
	const { handleSubmit, reset } = form;
    const { setUserData } = useAuth();

	const onSubmit = async () => {
		if (!file) {
            notify("Please select a picture before saving", "error");
			return ;
		}
		const formData = new FormData();

		formData.append('file', file);
		const result = await changeProfilePhoto(formData);
		if (result) {
            setUserData(result.updatedUser);
            notify("Profile picture updated successfully", "success");
        }
        reset({image: null});
	};

	return {
		handleSubmit,
		onSubmit,
        file,
        setFile
    };
};

export default useImageCoverForm;
