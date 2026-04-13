import { InputAdornment, TextField } from "@mui/material";
import CustomIconBtn from "../../../../shared/components/ui/CustomIconBtn";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
	size?: 'sm' | 'md' | 'lg';
	onClick?: () => void;
}

export default function SearchBar({ size = 'md', onClick }: SearchBarProps) {

	let iconSize: { width: number; height: number; };

	switch(size) {
		case 'sm':
			iconSize = { width: 20, height: 20 };
			break;
		case 'md':
			iconSize = { width: 30, height: 30 };
			break;
		case 'lg':
			iconSize = { width: 40, height: 40 };
			break;
		default:
			iconSize = { width: 30, height: 30 };
			break;
	}

	return (
		<form>
			<TextField
				size="small"
				fullWidth
				sx={{ bgcolor: 'secondary_2.main'}}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position="end">
								<CustomIconBtn 
									Icon={SearchIcon}
									bgColor="secondary_1"
									size={iconSize}
									onClick={onClick}
								/>
							</InputAdornment>
						),
					},
				}}
			/>
		</form>
	)
}
