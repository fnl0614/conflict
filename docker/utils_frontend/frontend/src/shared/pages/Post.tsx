
import { useOutletContext } from "react-router";
import WebBodyLayout from "../layouts/web/WebBodyLayout";
import { Box, Paper } from "@mui/material";
import PostingPage from "../../features/post/pages/PostingPage";

export default function Post(){
	const screen = useOutletContext();

	return (
		<>
			{
				screen === 'mb' ? <PostingPage />:
				<WebBodyLayout>
					{null}
					<Box sx={{ mx: 'auto', maxWidth: 800, py: 'auto'}}>
						<Paper><PostingPage /></Paper>
					</Box>
				</WebBodyLayout>

			}
		</>
	)
}