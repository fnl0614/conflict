import TitleBar from "../../../shared/components/ui/TitleBar";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Tos() {

	const [t] = useTranslation("global");
	const terms = t("setting-page.terms", { returnObjects: true }) as string[];

	return (
		<>
			<TitleBar title="Terms of Service" backLink='/setting' />
			<Box sx={{ p: 5 }}>
			{terms.map((paragraph, index) => (
				<Typography
					key={index}
					variant="body1"
					sx={{ textAlign: 'justify'}}
				>
				{paragraph}
				</Typography>
			))}
			</Box>
		</>
	  );
}
