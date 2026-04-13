import { Stack } from '@mui/material';
import SaveButton from '../../../setting/components/SaveButton';
import ImageUpload from "../../../../shared/components/ImageUpload";

import { useGroupImageForm } from '../../hooks/useGroupSetting';
import { useOutletContext } from 'react-router';

const GroupCoverImageForm = () => {
	const groupId = useOutletContext() as string;
	const {
		handleSubmit,
		onSubmit,
		file,
		setFile
	} = useGroupImageForm(groupId, 'cover');

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Stack spacing={8} alignItems='center'>
				<ImageUpload file={file} setFile={setFile} name='cover'/>
				<SaveButton type='submit'/>
			</Stack>
		</form>
	);
}

const GroupProfileImageForm = () => {
	const groupId = useOutletContext() as string;
	const {
		handleSubmit,
		onSubmit,
		file,
		setFile
	} = useGroupImageForm(groupId, 'profile');

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Stack spacing={8} alignItems='center'>
				<ImageUpload file={file} setFile={setFile} name='profile'/>
				<SaveButton type='submit' />
			</Stack>
		</form>
	);
}

export { GroupCoverImageForm, GroupProfileImageForm };