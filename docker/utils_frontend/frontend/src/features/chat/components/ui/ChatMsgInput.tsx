import { Paper, Stack, TextField } from "@mui/material";
import CustomIconBtn from "../../../../shared/components/ui/CustomIconBtn";
import SendIcon from '@mui/icons-material/Send';

export default function ChatMsgInput() {
	return (
		<Paper elevation={3} sx={{ padding: 2,  bgcolor: 'primary_1.main' }}>
			<form>
				<Stack alignContent={'center'} direction={'row'}>
					<TextField sx={{bgcolor: 'secondary_2.main', flexGrow: 1}}></TextField>
					<CustomIconBtn Icon={SendIcon} bgColor="secondary_1" size={{ width: 30, height: 30}} />
				</Stack>
			</form>
		</Paper>
	)
}
