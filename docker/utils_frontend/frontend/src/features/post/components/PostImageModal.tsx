import { Modal, Fade, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PostImageModalProps {
    imageUrl?: string | null;
    open: boolean;
    handleClose: () => void;
}

export default function PostImageModal({ imageUrl, open, handleClose } : PostImageModalProps) {
    const [t] = useTranslation("global");

    if (!imageUrl)
        return (null);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
            }}
            aria-hidden={false}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        outline: 'none',
                        maxWidth: '95vw',
                        maxHeight: '90vh',
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={t('post-page.postImageAlt')}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '90vh',
                            objectFit: 'contain',
                        }}
                    />
                </Box>
            </Fade>
        </Modal>
    );
}