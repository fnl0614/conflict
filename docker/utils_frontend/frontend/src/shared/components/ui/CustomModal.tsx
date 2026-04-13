import { Modal, Paper, Stack, Typography} from "@mui/material";
import TitleBar from "./TitleBar";
import CloseIcon from '@mui/icons-material/Close';

interface CenteredModalProps {
	open : boolean
	setter: (open : boolean) => void;
	Content : React.ReactNode;
	bottomText? : string,
	title : string,
	maxWidth? : number,
	minWidth? : number,
	closingModal?: boolean
}


const CenteredModal = ({
	open,
	setter,
	Content,
	bottomText,
	title,
	minWidth = 400,
	maxWidth = 500,
	closingModal = true
} : CenteredModalProps) => {

	return (
		<Modal
			open={open}
			onClose={(_event, reason) => {
				if (reason === 'backdropClick') return;
				setter(false);
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Paper sx={{ 
				padding: 3,
				width: { mobile: '90%', minitablet: '90%', tablet: '75%', laptop: '50%', desktop: '50%' },
				minWidth: minWidth,
				maxWidth: maxWidth,
			}}>
				<Stack display={'flex'} spacing={2}>
					<TitleBar
						title={title}
						Icon={closingModal ? CloseIcon : null}
						IconOnClick={() => setter(false)}
					/>
					{Content}
					<Typography variant='body1' textAlign={'center'}>
						{bottomText}
					</Typography>
				</Stack>
			</Paper>
		</Modal>
	);
	
}

export { CenteredModal };