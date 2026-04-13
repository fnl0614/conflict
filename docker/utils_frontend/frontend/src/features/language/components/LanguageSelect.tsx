import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import useLanguage from "../../setting/hooks/useLanguage";
import i18next from "i18next";

const LanguageSelect = () => {

	const {
        selectedLanguage,
		setSelectedLanguage,
    } = useLanguage();

	const title = 'LNG';

	return (
		<FormControl>
			<InputLabel id="language-select">{title}</InputLabel>
			<Select
				name={title}
				label={title}
				value={selectedLanguage}
				onChange={(e) => {
					const nextLang = e.target.value;
					i18next.changeLanguage(nextLang);
					setSelectedLanguage(nextLang);
				}}
				IconComponent={ExpandMoreIcon}
				sx={{
					backgroundColor: 'primary_1.main',
					borderRadius: 2,
					px: 1,
					'& .MuiSelect-icon': {
						color: 'primary_2.main',
					},

					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'transparent',
					},

					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: 'secondary_2.main',
					},
				}}
			>
				<MenuItem key={'en'} value={"en"}>
					{"EN"}
				</MenuItem>
				<MenuItem key={'fr'} value={"fr"}>
					{"FR"}
				</MenuItem>
				<MenuItem key={'es'} value={"es"}>
					{"ES"}
				</MenuItem>
			</Select>
		</FormControl>
	)
}

export default LanguageSelect;