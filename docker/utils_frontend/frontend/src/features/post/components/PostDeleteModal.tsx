import { Modal, Box, Paper, Typography, Stack, Button } from "@mui/material";
import usePostDeleteModal from "../hooks/usePostDeleteModal";

interface PostDeleteModalProps {
    postId: string;
    open: boolean;
    handleClose: () => void;
}

export default function PostDeleteModal({ postId, open, handleClose }: PostDeleteModalProps) {
    const {
        t,
        screen,
        handleDeletePost
    } = usePostDeleteModal();

    return (
        <Modal
            open={open}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
            }}
            aria-hidden={false}
        >
            <Box
                sx={{
                    outline: 'none',
                    width: '50vw',
                    height: '50vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    justifyItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Stack spacing={5} >
                        <Typography variant={screen === 'mb' ? 'body2' : 'h5'}>
                            {t("post-page.postDeletionConfirmation")}
                        </Typography>
                        <Stack direction="row" spacing={2} alignSelf='center'>
                            <Button variant="contained" color="primary" onClick={handleClose}>
                                {t("post-page.postDeletionNoBtn")}
                            </Button>
                            <Button variant="outlined"
                                onClick={() => handleDeletePost(postId)}
                            >
                                {t("post-page.postDeletionYesBtn")}
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </Modal>
    );
}
