import { Link, Stack } from "@mui/material";
import { useUtils } from "../hooks/useUtils";

export const CaptionLink = ({ link, text } : { link : string, text : string}) => (
	<Link
		href={link}
		color="primary_2"
		underline="hover"
		variant="caption"
		target="_blank" 
	>{text}</Link>
)

const Footer = ({ position = 'left'} : { position? : string}) => {

	const { t } = useUtils();

	return (
		<Stack
			direction={'row'}
			justifyContent={position}
			alignItems='center'
			spacing={2}
			padding={1}
			bgcolor={'primary_1.main'}
			width={'100%'}
		>
			<CaptionLink link='/termsOfService' text={t("legal.termsOfService.title")} />
			<CaptionLink link='/privacyPolicy' text={t("legal.privacyPolicy.title")} />
		</Stack>
	)
}

export default Footer;