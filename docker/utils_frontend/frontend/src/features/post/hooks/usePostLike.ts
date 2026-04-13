import { useState } from "react";
import { likePost } from "../services/postService";

const usePostLike = (isLiked: boolean, likeCount: number) => {
    const [isLikedState, setIsLikedState] = useState<boolean>(isLiked);
    const [likeCountState, setLikeCountState] = useState<number>(likeCount);
    const handleLike = async (postId: string) => {
        const result = await likePost(postId);

        if (!result)
            return ;
        setIsLikedState(result.isLiked);
        setLikeCountState(result.likeCount);
    }

    return ({
        isLikedState,
        likeCountState,
        handleLike
    })
}

export default usePostLike;
