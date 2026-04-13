import { Box, Stack, TextField } from "@mui/material";
import SaveButton from '../../../setting/components/SaveButton';
import usePostCreationForm from "../../hooks/usePostCreationForm";
import ImageUpload from "../../../../shared/components/ImageUpload";

export default function PostCreationForm({group_id} : {group_id ?: string}) {
    const {
		t,
		register,
		handleSubmit,
		errors,
		onSubmit,
        file,
        setFile,
    } = usePostCreationForm(group_id);

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={8} alignItems='center' sx={{py: 1}}>
                <Box width='75%' alignSelf='center' alignContent='center'>
                    <TextField
                        id='post'
                        label={t('post-page.contentInstruction')}
                        type='post'
                        multiline
                        variant="filled"
                        fullWidth
                        {...register("content", {
                            required: t('post-page.submitError'),
                        })}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                    />
                </Box>
                <ImageUpload name="imagePost" file={file} setFile={setFile}/>
                <SaveButton
                    type='submit'
                />
            </Stack>
        </form>
    );
}
