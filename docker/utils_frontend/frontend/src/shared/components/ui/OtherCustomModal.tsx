import { Modal, Paper, Stack, Typography} from "@mui/material";
import TitleBar from "./TitleBar";
import CloseIcon from '@mui/icons-material/Close';

interface OtherCenteredModalProps {
	open : boolean
	setter: (open : boolean) => void;
	Content : React.ReactNode;
	bottomText? : string,
	title : string
}


const OtherCenteredModal = ({open, setter, Content, bottomText, title} : OtherCenteredModalProps) => {

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
				minWidth: 400,
			}}>
				<Stack display={'flex'} spacing={2}>
					<TitleBar
						title={title}
						Icon={CloseIcon}
						IconOnClick={() => setter(false)}
						addBackLink={false}
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

export { OtherCenteredModal };