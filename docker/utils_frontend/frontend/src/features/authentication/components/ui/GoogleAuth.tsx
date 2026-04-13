import { Stack } from '@mui/material'
import GoogleIconButton from './GoogleIconButton'
import { useUtils } from '../../../../shared/hooks/useUtils';

export default function GoogleAuth(){

	const { t } = useUtils();

	return (
		<Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
				<p>{t("authentication-page.googleOpt")}</p>
				<GoogleIconButton/>
		</Stack>
	)
}
