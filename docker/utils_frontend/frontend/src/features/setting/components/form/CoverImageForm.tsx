import { Stack } from '@mui/material';
import SaveButton from '../../../setting/components/SaveButton';
import ImageUpload from "../../../../shared/components/ImageUpload";
import useImageCoverForm from "../../hooks/useImageCoverForm";

export default function CoverImageForm() {
    const {
		handleSubmit,
		onSubmit,
        file,
        setFile
    } = useImageCoverForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={8} alignItems='center'>
                <ImageUpload file={file} setFile={setFile} name='cover'/>
                <SaveButton
                    type='submit'
                />
            </Stack>
        </form>
    );
}
