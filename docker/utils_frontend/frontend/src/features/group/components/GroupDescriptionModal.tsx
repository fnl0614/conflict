import { Typography } from "@mui/material";
import { CenteredModal } from "../../../shared/components/ui/CustomModal";

interface GroupDescriptionModalProps {
	name : string,
	description : string
	open : boolean
	setter: (open : boolean) => void;
}

const GroupDescriptionModal = ({ name, description, open, setter }: GroupDescriptionModalProps) => {

	return (
		<CenteredModal
			open={open}
			setter={setter}
			Content={
				<Typography variant="body1">{description}</Typography>
			}
			title={name}
		/>
	)
}

export default GroupDescriptionModal;