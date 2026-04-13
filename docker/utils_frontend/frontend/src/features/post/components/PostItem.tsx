import { Card } from "@mui/material";
import usePostItem from "../hooks/usePostItem";
import type { PostItemProps } from "../data/postData";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostImage from "./PostImage";
import PostLike from "./PostLike";
import PostDeleteModal from "./PostDeleteModal";
import PostImageModal from "./PostImageModal";

export default function PostItem({
        postId,
        author,
        groupId,
        groupName,
        imageUrl,
        textContent,
        isLiked,
        likes,
        created_at
    } : PostItemProps) {

    const {
        openImgModal,
        handleOpenImage,
        handleCloseImage,
        openDltModal,
        handleOpenDelete,
        handleCloseDelete
    } = usePostItem();

    return (
        <>
            <Card sx={{ width: '95%', bgcolor: 'white' }}>
                <PostHeader 
                    author={author}
                    groupId={groupId}
                    groupName={groupName}
                    handleOpen={handleOpenDelete}
                    created_at={created_at}
                />
                <PostContent text={textContent} />
                <PostImage imageUrl={imageUrl} handleOpen={handleOpenImage}/>
                <PostLike postId={postId} likesNb={likes} isLiked={isLiked} />
            </Card>
            <PostDeleteModal postId={postId} open={openDltModal} handleClose={handleCloseDelete} />
            <PostImageModal imageUrl={imageUrl} open={openImgModal} handleClose={handleCloseImage} />
        </>
    );
}
