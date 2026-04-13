import CollectionsIcon from '@mui/icons-material/Collections';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Stack, Typography, Box, IconButton } from '@mui/material';
import useImageUpload from '../../features/setting/hooks/useImageUpload';

interface ImageUploadProps {
    file: File | null;
    setFile: (file: File | null) => void;
    name: string;
}

export default function ImageUpload ({file, setFile, name} : ImageUploadProps) {
    const {
        t,
        filePreview,
        handleFileChange
    } = useImageUpload();

    return (
        <Stack width="100%" spacing={3}>
            <Stack spacing={1}>
                <Typography align='center'>{t("setting-page.imageUpload")}</Typography>
                <Box
                    sx={{
                        width: '75%',
                        bgcolor: '#EAEAEA',
                        display: 'flex',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                        borderRadius: 1,
                    }}
                >
                    <Typography color="text.secondary">
                        {file? file.name: t("setting-page.imageLabel")}
                    </Typography>
                    <IconButton component="label">
                        <CollectionsIcon sx={{ color: '#836FFF' } } />
                        <input hidden type="file" accept="image/*" name={name}
                        onChange={(file) => handleFileChange(file, setFile)} />
                    </IconButton>
                </Box>
            </Stack>
            <Typography align='center' sx={{fontStyle: 'oblique', fontWidth: 'expanded'}}>{t("setting-page.imagePreview")}</Typography>
            <Box
                sx={{
                    width: '80%',
                    height: 229,
                    bgcolor: '#EAEAEA',
                    borderRadius: 2,
                    display: 'flex',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {filePreview ? (
                    <Box
                        component="img"
                        src={filePreview}
                        alt="preview"
                        sx={{
                            maxWidth: '100%',
                            maxHeight: '100%'
                        }}
                    />
                ) : (
                        <CameraAltIcon sx={{ fontSize: 80, color: '#BDBDBD' }} />
                    )}
            </Box>
        </Stack>
    );
}
