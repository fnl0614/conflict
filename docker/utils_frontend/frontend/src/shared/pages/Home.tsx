import PostFeed from "../../features/post/components/PostFeed";
import { BodyLayoutCentered } from "../layouts/BodyLayout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home(){
    const postFeedQueryClient = new QueryClient();

	return (
		<BodyLayoutCentered>
            <QueryClientProvider client={postFeedQueryClient}>
                <PostFeed isHome={true} />
            </QueryClientProvider>
		</BodyLayoutCentered>
	)
}
