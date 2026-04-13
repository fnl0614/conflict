import { useForm } from 'react-hook-form';
import { useUtils } from '../../../shared/hooks/useUtils';
import { changeGroupImage, deleteGroup, updateGroup } from '../services/groupSettingUpdate';
import type { GroupContentType } from '../data/groupType';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import type { CoverImageData } from '../../setting/data/settingType';
import { notify } from '../../../shared/utils/notify';

const useGroupSettingForm = (groupId: string, dataInitial: Partial<GroupContentType>, updated: string) => {
	const [ updateData, setUpdateData ] = useState<Partial<GroupContentType>>({...dataInitial});
	const form = useForm<GroupContentType>({
		defaultValues: {
			...updateData
		}
	});
	const { register, handleSubmit, formState, control } = form;
	const { errors } = formState;
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();
	
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
		event.preventDefault();

	const onSubmit = async (data: Partial<GroupContentType>) => {
		const response = await updateGroup(data, groupId);
		if (!response)
		{
			notify(`${updated} failed`, "error");
			return ;
		}
		notify(`${updated} updated successfully`, "success");
		setUpdateData(data);
	};

	return {
		register,
		handleSubmit,
		control,
		errors,
		handleMouseDownPassword,
		handleMouseUpPassword,
		onSubmit
    };
};

const useDeleteGroup = (groupId: string) => {
	const { navigate } = useUtils();
    const {
        mutate: deleteTheGroup,
        error,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: () => deleteGroup(groupId),
        onSuccess: () => {
			notify("Group deleted successfully", "success");
			navigate("/home");
        },
        onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Unknown error";
			notify(`${errorMessage}`,"error");
        }
    });

    const handleDeleteGroup = () => {
        deleteTheGroup();
    }

    return {
        handleDeleteGroup,
		deleteGroup,
        error,
        isPending,
        isSuccess
    }
}

const useGroupImageForm = (groupId : string, variant : string) => {
    const [file, setFile] = useState<File | null>(null);

	const form = useForm<CoverImageData>();
	const { handleSubmit, reset } = form;

	const onSubmit = async () => {
		if (!file) {
            notify("Please select a picture before saving", "error");
			return ;
		}
		const formData = new FormData();

		formData.append(`${variant}`, file);
		const result = await changeGroupImage(formData, groupId);
		if (result)
            notify(`Group ${variant} picture updated successfully`, "success");
		else
			notify(`Error on updating group ${variant} picture`, "error");
        reset({image: null});
	};

	return {
		handleSubmit,
		onSubmit,
        file,
        setFile
    };
};

export { useDeleteGroup, useGroupImageForm, useGroupSettingForm };
