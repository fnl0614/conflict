import { Box, CardActionArea, Stack, Typography } from "@mui/material";
import usePostLike from "../hooks/usePostLike";
import { ThumbUpOffAlt, ThumbUpAlt } from "@mui/icons-material";

interface PostLikeProps {
    postId: string;
    isLiked: boolean;
    likesNb: number;
}

export default function PostLike({ postId, isLiked, likesNb } : PostLikeProps) {
    const {
        isLikedState,
        likeCountState,
        handleLike
    } = usePostLike(isLiked, likesNb);

    return (
        <Box sx={{ justifySelf: 'center', width: '20%' }}>
            <CardActionArea
                sx={{ py: 1, width: '100%', textAlign: 'center', alignSelf: 'center' }}
                onClick={() => handleLike(postId)}
            >
                <Stack spacing={0.5} alignItems='center'>
                    { isLikedState ? <ThumbUpAlt color="primary"/> : <ThumbUpOffAlt color="primary"/> }
                    <Typography variant="body2" color="text.secondary">
                        { likeCountState > 0 ? likeCountState : "" }
                    </Typography>
                </Stack>
            </CardActionArea>
        </Box>
    );
}
