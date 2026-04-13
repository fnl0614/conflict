import { Stack, Typography, Card, CardContent, CardActions } from "@mui/material";
import TitleBar from "../../../../shared/components/ui/TitleBar";
import { BodyLayoutCentered } from "../../../../shared/layouts/BodyLayout";
import CustomAvatar from "../../../../shared/components/ui/CustomAvatar";
import RegularList from "../../../../shared/components/list/RegularList";
import { InviteToGroupBtn } from "../../components/ui/GroupBtn";
import CloseIcon from '@mui/icons-material/Close';

import { useUtils } from "../../../../shared/hooks/useUtils";
import useScreenMobile from "../../../../shared/hooks/useScreen";
import { getFullName } from "../../../../shared/utils/stringUtils";
// import type { friendData } from "../../../friend/data/friendData";
import { RenderGroupState } from "../../components/RenderGroupState";
import { useFriendsToInvite } from "../../hooks/useGroupProfile";
import type { AuthData } from "../../../authentication/data/authType";
import { useGroup } from "../../hooks/useGroup";

export interface inviteFriendItemProps {
	inviteFriend : 
	{
		friend: AuthData;
		groupId: string;
	}
}

const inviteFriendItem = ({ inviteFriend } : inviteFriendItemProps) => {
	const { friend, groupId } = inviteFriend;
	const { id, urlProfil, firstName, lastName } = friend;

	return (
		<Card sx={{ width: '100%', bgcolor: 'primary_1.main' }}>
			<Stack direction={'row'} alignItems={'center'}>
				<CardContent sx={{ width: '65%' }}>
					<Stack direction={'row'} alignItems={'center'} spacing={1}>
						<CustomAvatar 
							id={id}
							urlProfil={urlProfil}
							size={{ width: 40, height: 40 }}
							isNotClickable={true}
						/>
						<Typography variant="h6" color="secondary_1" noWrap>{getFullName(firstName, lastName)}</Typography>
					</Stack>
				</CardContent>
				<CardActions sx={{ width: '35%', justifyContent: 'center'}}>
					<InviteToGroupBtn groupId={groupId} userId={id} />
				</CardActions>
			</Stack>
		</Card>
	)
}

const transformFriendArray = (array : AuthData[] | undefined | null, groupId: string) => {
	if (!array) return [];

	return array.map((friend) => ({
		friend,
		groupId
	}))
}

const GroupInviteToJoin = () => {

	const isMobile = useScreenMobile();
	const { t, navigate } = useUtils();
	const { items } = useFriendsToInvite();
	const { groupData, status, error } = useGroup();

	if (status != 'success' || !groupData) {
		return <RenderGroupState status={status} groupData={groupData} error={error} />;
	}

	const groupId = groupData.group.id;

	const newItems = groupData ? transformFriendArray(items, groupId) : [];

	return (
		<BodyLayoutCentered>
			<Stack width='stretch' spacing={5}>
				<TitleBar
					title={t("group.interaction.invite")}
					Icon={isMobile ? null : CloseIcon}
					IconOnClick={() => navigate(`/group/${groupId}`)}
					backLink={`/group/${groupId}`}
				/>
				<Typography variant="body1" align="center">{t("group.interaction.inviteText")}</Typography>
				<Stack paddingX={1}>
					<RegularList
						items={newItems}
						resourceName={"inviteFriend"}
						ItemComponent={inviteFriendItem}
					/>
				</Stack>
			</Stack>
		</BodyLayoutCentered>
	)
}

export default GroupInviteToJoin;