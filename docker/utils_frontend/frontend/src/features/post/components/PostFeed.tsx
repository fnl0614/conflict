import { Stack, Typography, Link, Box, Paper } from "@mui/material";
import PostItem from "./PostItem";
import usePostFeed from "../hooks/usePostFeed";
import type { PostDataResponse, PostItemProps } from "../data/postData";
import Loading from "../../../shared/components/Loading";

interface PostFeedProps {
    isHome?: boolean;
    user_id?: string;
    group_id?: string;
}

export default function PostFeed({ isHome = false, user_id, group_id } : PostFeedProps) {
    const {
        t,
        isPending,
        error,
        data
    } = usePostFeed(isHome, user_id, group_id);

    if (isPending)
        return (<Loading />);
    if (error) {
        return (
            <>
                <Typography >{error.message}</Typography>
            </>
        );
    }
    const postArray: PostItemProps[] = [];
    data.forEach((post : PostDataResponse) => {
        postArray.push({
            author: {
                ownerId: post.author.id,
                ownerFirstName: post.author.firstName,
                ownerLastName: post.author.lastName,
                ownerImageUrl: post.author.urlProfil
            },
            textContent: post.description,
            groupId: post.group_id,
            likes: post.likeCount,
            isLiked: post.isLiked,
            postId: post.id,
            imageUrl: post.url_image,
            created_at: new Date(post.created_at)
        });
    });
    if (postArray.length === 0) {
        if (isHome) {
            return (
                <Paper sx={{p: 2}} elevation={3}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        gap: 2,
                        height: '20vh',
                    }}>
                        <Typography variant='h6' >
                            {t("home-page.postInstruction")}
                        </Typography>
                    </Box>
                </Paper>
            );
        }
        return (
            <Paper sx={{p: 2}} elevation={3}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    height: '50vh',
                }}>
                    <Typography variant="h6">{t('post-page.postCreationInstruction1')}</Typography>
                    <Typography variant="h6">{t('post-page.postCreationInstruction2')}<Link href="/posts">{t('post-page.postCreationInstruction3')}</Link>{t('post-page.postCreationInstruction4')}</Typography>
                </Box>
            </Paper>
        );
    }
	return (
		<Stack 
			sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    py: 2,
				}}
			>
            {
                postArray.map((post: PostItemProps, index: number) => (
                    <PostItem
                        key={index}
                        postId={post.postId}
                        author={post.author}
                        groupId={post.groupId}
                        groupName={post.groupName}
                        textContent={post.textContent}
                        imageUrl={post.imageUrl}
                        isLiked={post.isLiked}
                        likes={post.likes}
                        created_at={post.created_at}
                    />
                ))
            }
		</Stack>
	)
}
