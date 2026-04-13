import { Grid, Link, Paper, Stack, Typography } from "@mui/material";
<<<<<<< HEAD
import AvatarSquare from "../../../shared/components/ui/AvatarSquare";
import { useGroupUserList } from "../../group/hooks/useGroupList";
import useScreenMobile from "../../../shared/hooks/useScreen";
import LoadingCircular from "../../../shared/components/LoadingCircular";
=======
import AvatarSquare from "../components/ui/AvatarSquare";
>>>>>>> main
import usePartialList from "../hooks/usePartialList";
import Loading from "../../../shared/components/Loading";

interface GroupPartialListStructProps {
	link: string,
	type: string,
	items: {
		urlProfil: string,
		name: string,
		id: string
	}[]
}

<<<<<<< HEAD
const GroupPartialListStruct = ( { items, link, type }: GroupPartialListStructProps) => {

	const nb = items? items.length : 0;

=======
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
>>>>>>> main
	return (
		<Paper sx={{ p: 2 }} elevation={3}>
			<Stack direction="row" justifyContent="space-between">
				<Typography variant="h6" textTransform={'capitalize'}>{type} : {nb}</Typography>
<<<<<<< HEAD
				<Link href={link} sx={{ textDecoration: 'none', color: 'accent_2.main' }}>See all</Link>
=======
				<Link href={`/users/${id}/${type}`} sx={{ textDecoration: 'none', color: 'accent_2.main' }}>See all</Link>
>>>>>>> main
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
<<<<<<< HEAD
							profileUrl={item.urlProfil}
							fullName={item.name}
							id={item.id}
							variant={type === 'group' ? 'group' : 'user'}
						/>
					</Grid>
				))}
			</Grid>
		</Paper>
	)
}

const transformGroupUserList = (items: any[]) => {
	return items.map(item => ({
		urlProfil: item.group.urlProfil,
		name: item.group.name,
		id: item.group.id
	}))
}


const GroupPartialList = ({ userId }: {userId: string}) => {

	const initPage = 0;
	const initCount = useScreenMobile() ? 3 : 6;

	const { items, status, error } = useGroupUserList({userId, initPage, initCount});

	if (status === 'error')
		return <div>{error?.message}</div>;
	if (status === 'pending')
		return <LoadingCircular />;

	const newItems = transformGroupUserList(items);

	return (
		<GroupPartialListStruct link={`/users/${userId}/group`} type={"group"} items={newItems} />
	)
}

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
							profileUrl={item.urlProfil}
							fullName={item.firstName + " " + item.lastName}
=======
							imageUrl={item.urlProfil}
							altText={item.firstName + " " + item.lastName}
							name={item.firstName + " " + item.lastName}
>>>>>>> main
							id={item.id}
						/>
					</Grid>
				))}
			</Grid>
		</Paper>
	)
}

export {
	PartialList,
	GroupPartialList
};