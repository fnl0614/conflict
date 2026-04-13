import { useTranslation } from "react-i18next";
import { getPostFeed } from "../services/postService";
import { useQuery } from '@tanstack/react-query';

const usePostFeed = (isHome?: boolean, user_id?: string, group_id?: string) => {
    const [t] = useTranslation("global");
    const { isPending, error, data } = useQuery({
        queryKey: ['postFeed'],
        queryFn: async () => await getPostFeed(isHome, user_id, group_id),
    });

    return ({
        t,
        isPending,
        error,
        data
    });
}

export default usePostFeed;
