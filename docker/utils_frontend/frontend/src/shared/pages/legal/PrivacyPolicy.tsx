import TitleBar from "../../components/ui/TitleBar";
import { Box, Stack } from "@mui/material";
import CustomTitleBar from "../../components/ui/CustomTitleBar";
import CustomMarkdown from "../../components/typography/CustomMarkdown";

import type { sectionType } from "../../data/sharedType";
import { useUtils } from "../../hooks/useUtils";
import { useLocation } from "react-router";

export default function PrivacyPolicy() {

	const { t, navigate } = useUtils();
	const { pathname } = useLocation();
	const title = t("legal.privacyPolicy.title");
	const date = t("legal.privacyPolicy.lastUpdated", {
		date: "10/04/2026"
	});
	const section = t("legal.privacyPolicy.sections", {
		appName: "LikeoApp",
		email: "contact@mysite.com",
		country: "Madagascar",
		returnObjects: true
	}) as sectionType[];

	return (
		<Stack justifyContent="center" alignItems="center" >
			{
				pathname.startsWith('/setting') ? 
				<TitleBar
					title={title}
					backLink='/setting'
					IconOnClick={() => navigate('/')}
				/> : <CustomTitleBar title={title}/>
			}
			<Stack 
				sx={{
					width: '100%',
					maxWidth: '1000px',
					marginX: 'auto',
				}}
				padding={5}
			>
			<CustomMarkdown text={date} />
			{
				section.map((section : sectionType, index: number) => (
					<Box key={index}>
						<CustomMarkdown text={section.title} />
						<CustomMarkdown text={section.content} />
					</Box>
				))
			}
			</Stack>
		</Stack>
	);
}