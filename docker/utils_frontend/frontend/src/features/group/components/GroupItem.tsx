import { Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import CustomAvatar, { SquareAvatarItem } from "../../../shared/components/ui/CustomAvatar";
import GroupInteraction from "./ui/GroupInteraction";
import GroupDescriptionModal from "./GroupDescriptionModal";

import { useUtils } from "../../../shared/hooks/useUtils";
import { useGroupRequestInteraction } from "../hooks/useGroupInteraction";
import type { GroupContentType, GroupInvitationType, GroupType } from "../data/groupType";

const getType = (role: string) => {
	switch (role) {
		case 'MEMBER':
			return 'quit';
		case 'INVITATION':
			return 'invitation';
		default:
			return 'default';
	}
}

interface CardProps {
	type: string;
	group: GroupContentType;
	requestId: string;
	onClick: () => void;
}

const WbCardGroup = ({onClick, group, type, requestId } : CardProps) => {
	const { urlProfil, name, id } = group;
	const cardHeight = type === 'default' ? 'fit-content' : '350px';

	return (
		<Card sx={{ width: '200px', height: cardHeight, bgcolor: 'white'}}>
			<Stack justifyContent={'center'} margin={1}>
				<CardActionArea onClick={onClick}>
					<CardContent sx={{ padding: 0, margin: 0 }}>
						<Stack alignItems={'center'} spacing={1} height={'75%'}>
							<SquareAvatarItem 
								urlProfil={urlProfil}
								size={{ width: '100%', height: '100%'}}
								variant="group"
								shape="square"
							/>
							<Stack width={'100%'} justifyContent={'center'} alignContent={'center'}>
								<Typography textAlign={'center'}  variant="h6" color="secondary_1" noWrap>{name}</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{ width: '100%', height: '100%', justifyContent: 'center'}}>
					<GroupInteraction type={type} variant='extended' groupId={id} requestId={requestId}/>
				</CardActions>
			</Stack>
		</Card>
	)
}

const MbCardGroup = ({onClick, group, type, requestId} : CardProps) => {
	const { urlProfil, name, id } = group;

	return (
		<Card sx={{ width: '100%', bgcolor: 'primary_1.main', paddingX: 2 }}>
			<Stack direction={'row'} alignItems={'center'}>
				<CardActionArea sx={{ width: '65%' }} onClick={onClick}>
					<CardContent>
						<Stack direction={'row'} alignItems={'center'} gap={1}>
							<CustomAvatar 
								id={id}
								urlProfil={urlProfil}
								size={{ width: 40, height: 40 }}
								isNotClickable={true}
								variant="group"
							/>
							<Stack width={'100%'} justifyContent={'center'} alignContent={'center'}>
								<Typography textAlign={'center'} variant="h6" color="secondary_1" noWrap>{name}</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{ width: '35%', justifyContent: 'center' }}>
					<GroupInteraction type={type} groupId={id} requestId={requestId}/>
				</CardActions>
			</Stack>
		</Card>
	)
}

const WbGroupItem = ({ group }: GroupType) => {
	const { navigate } = useUtils();
	const { id, role } = group;

	return (
		<WbCardGroup
			type={getType(role)}
			group={ group }
			requestId=""
			onClick={() => navigate(`/group/${id}`)}
		/>
	)
}

const MbGroupItem = ({ group }: GroupType) => {
	const { navigate } = useUtils();
	const { id, role } = group;

	return (
		<MbCardGroup
			type={getType(role)}
			group={ group }
			requestId=""
			onClick={() => navigate(`/group/${id}`)}
		/>
	)
}

const WbGroupInvitationCardItem = ({ invitationGroup }: GroupInvitationType) => {
	const { name, role, description, requestId } = invitationGroup;
	const { showGroupDescription, openDescription, setOpenDescription } = useGroupRequestInteraction(requestId);

	return (
		<>
			<GroupDescriptionModal
				name={name}
				description={description}
				open={openDescription}
				setter={setOpenDescription}
			/>
			<WbCardGroup
				type={ getType(role)}
				group={ invitationGroup }
				requestId={requestId}
				onClick={showGroupDescription}
			/>
		</>
	)
}

const MbGroupInvitationCardItem = ({ invitationGroup }: GroupInvitationType) => {

	const { name, role, description, requestId} = invitationGroup;
	const { showGroupDescription, openDescription, setOpenDescription } = useGroupRequestInteraction(requestId);

	return (
		<>
			<GroupDescriptionModal
				name={name}
				description={description}
				open={openDescription}
				setter={setOpenDescription}
			/>
			<MbCardGroup
				type={ getType(role)}
				group={ invitationGroup }
				requestId={requestId}
				onClick={showGroupDescription}
			/>
		</>
	)
}

export { 
	MbGroupItem,
	WbGroupItem,
	MbGroupInvitationCardItem,
	WbGroupInvitationCardItem
};
