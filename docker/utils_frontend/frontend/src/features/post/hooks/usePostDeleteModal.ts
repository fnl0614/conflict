import { useNavigate, useOutletContext, useParams } from "react-router";
import { deletePost } from "../services/postService";
import { useTranslation } from "react-i18next";

const usePostDeleteModal = () => {
    const screen = useOutletContext();
    const id = useParams().id ?? '';
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const handleDeletePost = async (postId: string) => {
        const result = await deletePost(postId);

        if (!result)
            return (null);
        navigate(`/users/${id}`);
    }

    return ({
        t,
        screen,
        handleDeletePost
    });
}

export default usePostDeleteModal;
