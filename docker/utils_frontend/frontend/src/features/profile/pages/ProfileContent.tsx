import { Grid, Paper, Stack, Typography, Box } from "@mui/material"
import PostFeed from "../../post/components/PostFeed"
import { useOutletContext, useParams } from "react-router";
import PartialList from "../components/PartialList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useProfile from "../hooks/useProfile";
import { useTranslation } from "react-i18next";

export default function ProfileContent() {

	const screen = useOutletContext();
    const postFeedQueryClient = new QueryClient();
    const id = useParams().id as string || '';
    const { relation } = useProfile();
    const [t] = useTranslation("global");

	return (
	<>
		{
			screen === 'mb' ?
			<Stack>
				<PartialList type="friend" />
				<PartialList type="group" />
                { relation === 'user' ? 
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
                                {t("profile-page.postInstruction")}
                            </Typography>
                        </Box>
                    </Paper>
                : 
                    <QueryClientProvider client={postFeedQueryClient}>
                        <PostFeed user_id={id} />
                    </QueryClientProvider>
                }
			</Stack>
			: 
			<Grid
				container
				spacing={2}
				direction={"row"}
				justifyContent={'center'}
				paddingX={{ minitablet: 8, tablet: 0, laptop: 0, desktop: 0}}
			>
				<Grid
					container
					size={{ minitablet: 12, tablet: 5, laptop: 5, desktop: 5}}
					spacing={3}
					direction="column"
				>
					<PartialList type="friend" />
					<PartialList type="group" />
				</Grid>
				<Grid size={{ minitablet: 12, tablet: 7, laptop: 7, desktop: 7}}>
                { relation === 'user' ? 
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
                                {t("profile-page.postInstruction")}
                            </Typography>
                        </Box>
                    </Paper>
                : 
                    <QueryClientProvider client={postFeedQueryClient}>
                        <PostFeed user_id={id} />
                    </QueryClientProvider>
                }
				</Grid>
			</Grid>
		}
	</>
	)
}
