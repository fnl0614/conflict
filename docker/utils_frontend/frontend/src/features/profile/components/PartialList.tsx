import { Grid, Link, Paper, Stack, Typography } from "@mui/material";
import AvatarSquare from "../components/ui/AvatarSquare";
import usePartialList from "../hooks/usePartialList";
import Loading from "../../../shared/components/Loading";

interface PartialListProps {
	type: "friend" | "group";
}

const PartialList = ( { type }: PartialListProps) => {
	const {
		nb,
		items,
		id,
		loading
	} = usePartialList(type, "partial");

	if (loading) {
		return (<Loading />);
	}
	return (
		<Paper sx={{ p: 2 }} elevation={3}>
			<Stack direction="row" justifyContent="space-between">
				<Typography variant="h6" textTransform={'capitalize'}>{type} : {nb}</Typography>
				<Link href={`/users/${id}/${type}`} sx={{ textDecoration: 'none', color: 'accent_2.main' }}>See all</Link>
			</Stack>
			<Grid
				direction="row"
				justifyContent={'space-between'}
				spacing={2}
				container
			>
				{ items.map((item, index) => (
					<Grid key={index} size={{ mobile: 'auto', minitablet: 'auto', tablet: 4, laptop: 4, desktop: 4}} justifyContent='center'>
						<AvatarSquare
							imageUrl={item.urlProfil}
							altText={item.firstName + " " + item.lastName}
							name={item.firstName + " " + item.lastName}
							id={item.id}
						/>
					</Grid>
				))}
			</Grid>
		</Paper>
	)
}

export default PartialList;