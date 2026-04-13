import { Button, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { CustomBtn } from "../../../../shared/components/ui/CustomButton";
import CustomIconBtn from "../../../../shared/components/ui/CustomIconBtn";

import { useUtils } from "../../../../shared/hooks/useUtils";
import { useGroupRequestInteraction, useInviteToGroup, useQuitGroup, useRemoveGroupMember } from "../../hooks/useGroupInteraction";
import type { GroupAndUserType } from "../../data/groupType";

interface GroupBtnProps {
	groupId : string,
	requestId?: string,
	variant?: 'extended' | 'normal'
}

const SettingBtn = ({ groupId } : GroupBtnProps) => {

	const { t } = useUtils();

	return (
		<CustomBtn
			link={`/group/${groupId}/setting`}
			title={t("profile-page.setting")}
			bgColor={"primary_2"}
		/>
	)
}

const RemoveMemberBtn = ({ groupId, userId } : GroupAndUserType) => {

	const { t } = useUtils();
	const { handleRemovingMember, isPending, isSuccess } = useRemoveGroupMember(groupId, userId);

	return (
		<CustomBtn
			bgColor='accent_1'
			title={t("group.interaction.remove")}
			onClick={handleRemovingMember}
			loading={isPending}
			disabled={isSuccess}
		/>
	)
}

const PostBtn = ({ groupId } : GroupBtnProps) => {
	const { t } = useUtils();

	return (
		<CustomBtn
			link={`/group/${groupId}/post`}
			title={t("group.post")}
			bgColor={"secondary_1"}
		/>
	)
}

const GoSendInvitationBtn = ({ groupId } : GroupBtnProps) =>{
	const { t } = useUtils();

	return (
		<CustomBtn
			link={`/group/${groupId}/sendInvitation`}
			title={t("group.interaction.invite")}
			bgColor={"accent_2"}
		/>
	)
}

const InviteToGroupBtn = ({ groupId, userId } : GroupAndUserType) =>{
	const { t } = useUtils();
	const { 
		handleSendingInvitation,
        isSendingGroupInvitation,
        isSendingGroupInvitationSuccess
	} = useInviteToGroup(groupId, userId);

	return (
		<CustomBtn
			title={t("group.interaction.inviteBtn")}
			bgColor={"accent_2"}
			onClick={handleSendingInvitation}
			loading={isSendingGroupInvitation}
			disabled={isSendingGroupInvitationSuccess}
		/>
	)
}

const InvitationActionBtnList = ({ requestId } : Pick<GroupBtnProps, 'requestId'>) => {
	const { 
		handleAcceptInvitation,
		isAccepting,
		isAcceptSuccess,
		handleDeclineInvitation,
		isDeclining,
		isDeclineSuccess
	} = useGroupRequestInteraction(requestId ? requestId : '');

	const isDisabled = isAcceptSuccess || isDeclineSuccess;
	const isLoading = isAccepting || isDeclining;

	return (
		<Stack spacing={1} width={'100%'}>
			<CustomIconBtn
				bgColor='accent_2'
				Icon={CheckIcon}
				onClick={handleAcceptInvitation}
				loading={isLoading}
				disabled={isDisabled}
			/>
			<CustomIconBtn
				bgColor='accent_1'
				Icon={CloseIcon}
				onClick={handleDeclineInvitation}
				loading={isLoading}
				disabled={isDisabled}
			/>
		</Stack>
	)
}

const QuitGroupBtn = ({ groupId, variant } : GroupAndUserType) => {

	const { t } = useUtils();
	const { handleQuitGroup, isQuitting, isQuitSuccess } = useQuitGroup(groupId);

	return (
		<CustomBtn 
			bgColor='accent_1'
			title={t("group.interaction.quit")}
			variant={variant}
			onClick={handleQuitGroup}
			loading={isQuitting}
			disabled={isQuitSuccess}
		/>
	)
}

const SubmitCreateBtn = ({ isPending, title } : { 
	isPending : boolean,
	title : string,
 } ) => {

	return (
		<Button
			variant="contained"
			type='submit'
			color='secondary_1'
			sx={{ textTransform: 'uppercase', color: 'white'}}
			disabled={isPending}
		>{title}</Button>
	)
}

export {
	SettingBtn,
	RemoveMemberBtn,
	PostBtn,
	GoSendInvitationBtn,
	InviteToGroupBtn,
	InvitationActionBtnList as InvitationActionBtn,
	QuitGroupBtn,
	SubmitCreateBtn
};