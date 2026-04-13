import { Paper, Stack } from "@mui/material";
import SearchBar from "./ui/SearchBar";
import GoBackBtn from "../../../shared/components/ui/GoBackBtn";

export default function SearchHeader() {
  return (
	<Paper sx={{ padding: 2 }} elevation={3}>
		<Stack justifyContent={'center'} direction={'row'} spacing={5}>
			<GoBackBtn 
				btnStyle={{ alignSelf: 'flex-start' }}
				iconStyle={{ color: '#836FFF' }}
				link={"/"}
			/>
			<SearchBar/>
		</Stack>
	</Paper>
  )
}
