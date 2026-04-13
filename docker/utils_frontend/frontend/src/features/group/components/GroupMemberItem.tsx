import { Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import CustomAvatar, { SquareAvatarItem } from "../../../shared/components/ui/CustomAvatar";
import { getFullName } from "../../../shared/utils/stringUtils";

import { useUtils } from "../../../shared/hooks/useUtils";
import { RemoveMemberBtn } from "./ui/GroupBtn";
import type { AuthData } from "../../authentication/data/authType";

interface GroupMemberItemProps {
	memberGroup: {
		member: AuthData,
		groupId?: string;
	}
}

interface MemberItemProps {
	member : AuthData
}

const UserActionArea = ( {member} : {member: AuthData}) => {

    const { navigate } = useUtils();
	const { id, firstName, lastName, urlProfil } = member;

	return (
		<CardActionArea sx={{ width: '75%' }} onClick={() => navigate(`/users/${id}`)}>
			<CardContent>
				<Stack direction={'row'} alignItems={'center'} gap={1}>
					<CustomAvatar 
						id={id}
						urlProfil={urlProfil}
						size={{ width: 40, height: 40 }}
						isNotClickable={true}
					/>
					<Stack width={'100%'} justifyContent={'center'} alignContent={'center'}>
						<Typography variant="h6" color="secondary_1" noWrap>{getFullName(firstName, lastName)}</Typography>
					</Stack>
				</Stack>
			</CardContent>
		</CardActionArea>
	)
}

const GroupMemberItem = ({ memberGroup }: GroupMemberItemProps ) => {

	const { member, groupId } = memberGroup;
	return (
		<Card sx={{ width: '100%', bgcolor: 'primary_1.main', paddingX: 2 }}>
			<Stack direction={'row'} alignItems={'center'}>
				<UserActionArea member={member}/>
				<CardActions sx={{ width: '25%', justifyContent: 'center' }}>
					<RemoveMemberBtn groupId={groupId ? groupId : ''} userId={member.id}/>
				</CardActions>
			</Stack>
		</Card>
	)
}

const WbGroupMemberDisplayItem = ({ member }: MemberItemProps ) => {
    const { navigate } = useUtils();
    const { id, firstName, lastName, urlProfil } = member;

	return (
		<Card sx={{ width: '200px', bgcolor: 'white'}}>
			<Stack justifyContent={'center'} margin={1}>
				<CardActionArea onClick={() => navigate(`/users/${id}`)}>
					<CardContent sx={{ padding: 0, margin: 0 }}>
						<Stack alignItems={'center'} spacing={1} height={'75%'}>
							<SquareAvatarItem 
								urlProfil={urlProfil}
								size={{ width: '100%', height: '100%'}}
								variant="user"
								shape="square"
							/>
							<Stack width={'100%'} justifyContent={'center'} alignContent={'center'}>
								<Typography textAlign={'center'} variant="h6" color="secondary_1" noWrap>{getFullName(firstName, lastName)}</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Stack>
		</Card>
	)
}

const MbGroupMemberDisplayItem = ({ member }: MemberItemProps ) => {

	return (
		<Card sx={{ width: '100%', bgcolor: 'primary_1.main' }}>
			<Stack direction={'row'} alignItems={'center'}>
                <UserActionArea member={member}/>
			</Stack>
		</Card>
	)
}

export { GroupMemberItem, WbGroupMemberDisplayItem, MbGroupMemberDisplayItem };