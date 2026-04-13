import { Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import UserAvatar from "../../profile/components/ui/UserAvatar";
import { MbGroupInteraction, WbGroupInteraction } from "./ui/GroupInteraction";
import type { groupData } from "../data/groupData";

const getType = (role: string) => {
	switch (role) {
		case 'myGroup':
			return 'quit';
		case 'other':
			return 'join';
		case 'waiting':
			return 'pending';
		case 'invitation':
			return 'invitation';
		default:
			return 'join';
	}
}

const WbGroupItem = ({ group }: groupData) => {
	const { urlProfil, name, role } = group;

	return (
		<Card sx={{ width: '200px', height: '350px', bgcolor: 'white'}}>
			<Stack justifyContent={'center'} margin={1}>
				<CardActionArea>
					<CardContent sx={{ padding: 0, margin: 0 }}>
						<Stack alignItems={'center'} spacing={1} height={'75%'}>
							<img alt="Profil" src={urlProfil} className="w-full h-50 object-cover"/>
							<Typography variant="h6" color="secondary_1" noWrap>{name}</Typography>
						</Stack>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{ width: '100%', height: '100%', justifyContent: 'center'}}>
					<WbGroupInteraction type={getType(role)}/>
				</CardActions>
			</Stack>
		</Card>
	)
}

const MbGroupItem = ({ group }: groupData) => {

	const { id, urlProfil, name, role } = group;

	return (
		<Card sx={{ width: '100%', bgcolor: 'primary_1.main', paddingX: 2 }}>
			<Stack direction={'row'} alignItems={'center'}>
				<CardActionArea sx={{ width: '75%' }}>
					<CardContent>
						<Stack direction={'row'} alignItems={'center'} gap={1}>
							<UserAvatar 
								id={id}
								urlProfil={urlProfil}
								size={{ width: 40, height: 40 }}
								isNotClickable={true}
							/>
							<Typography variant="h6" color="secondary_1" noWrap>{name}</Typography>
						</Stack>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{ width: '25%', justifyContent: 'center' }}>
					<MbGroupInteraction type={getType(role)}/>
				</CardActions>
			</Stack>
		</Card>
	)
}

export { MbGroupItem, WbGroupItem };
