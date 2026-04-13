import CustomIconBtn from "./CustomIconBtn";
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = () => {
	return (
		<CustomIconBtn
			Icon={CloseIcon}
			size={{width: '24px', height: '24px'}}
			bgColor='secondary_1'
		/>
	);
}

export default CloseButton;