import { IconButton, Paper, Stack, Typography } from "@mui/material";
import Logo from "../Logo";
import { useUtils } from "../../hooks/useUtils";
import LanguageSelect from "../../../features/language/components/LanguageSelect";
import useScreenMobile from "../../hooks/useScreen";
import GoBackBtn from "./GoBackBtn";

export type CustomTitleBarProps = {
	title: string;
}

export default function CustomTitleBar({ title } : CustomTitleBarProps) {

    const { navigate } = useUtils();
	const isMobile = useScreenMobile();

    const logoSize = 'sm';

	return(
		<Paper sx={{width: '100%', position: 'static'}}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ p: 2}}>
				<IconButton sx={{  alignSelf: 'flex-start' }} onClick={() => navigate('/')}>
                    {isMobile ? 
						<GoBackBtn
							btnStyle={{alignSelf: 'flex-start'}}
							iconStyle={{color: '#836FFF', fontSize: 'large'}}
							link='/'
						/> : <Logo size={logoSize} />}
                </IconButton>
				<Typography
					variant='h4'
					align='center'
					justifyContent='center'
					color='secondary_1.main'
					sx={{fontWeight: 'bold', textAlign: 'center'}}
				>{title}</Typography>
                <Stack sx={{  alignSelf: 'flex-end' }}><LanguageSelect /></Stack>
			</Stack>
		</Paper>
	);
}
