import { Stack } from '@mui/material';
import SaveButton from '../SaveButton';
import ImageUpload from "../../../../shared/components/ImageUpload";
import useImageProfileForm from '../../hooks/useImageProfileForm';

export default function ProfileImageForm() {
    const {
		handleSubmit,
		onSubmit,
        file,
        setFile
    } = useImageProfileForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={8} alignItems='center'>
                <ImageUpload file={file} setFile={setFile} name='profil'/>
                <SaveButton
                    type='submit'
                />
            </Stack>
        </form>
    );
}
