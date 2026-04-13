import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Stack, type SxProps, type Theme } from '@mui/material';
import CustomIconBtn from '../../../../shared/components/ui/CustomIconBtn';
import type { customColor } from '../../../../shared/data/sharedType';
<<<<<<< HEAD
import { CustomBtn } from '../../../../shared/components/ui/CustomButton';
import useFriendAction from '../../hooks/useFriendAction';

import { useUtils } from '../../../../shared/hooks/useUtils';
=======
import { CustomLargeBtn } from '../../../../shared/components/ui/CustomButton';
import useFriendAction from '../../hooks/useFriendAction';
>>>>>>> main

interface FriendActionProps {
    request_id?: string | null; 
    user_id: string;
    type?: string;
    size?: SxProps<Theme>;
    variant?: 'extended' | 'normal';
}

<<<<<<< HEAD
const WbFriendInteraction = ({ type, user_id, request_id, variant = 'normal' }: FriendActionProps) => {
    const { t } = useUtils();
=======
const WbFriendInteraction = ({ type, user_id, request_id }: FriendActionProps) => {
>>>>>>> main
    let bgColor: customColor;
    let title: string;
    let clickAction: () => void;
    const {
        onClickAcceptInvitation,
        onClickDeclineInvitation,
        onClickSendInvitation,
        onClickRemoveFriend,
        loading,
        loadingAccept,
        loadingDecline,
        disabled
    } = useFriendAction();

    if (type === 'invitation') {
        return (
            <Stack spacing={1} width={'100%'}>
<<<<<<< HEAD
                <CustomBtn variant={variant} link='#' title={t("common-group-friend.accept")} bgColor='accent_2' onClick={() => onClickAcceptInvitation(request_id ? request_id : user_id)} loading={loadingAccept} disabled={disabled}/>
                <CustomBtn variant={variant} link='#' title={t("common-group-friend.decline")} bgColor='accent_1' onClick={() => onClickDeclineInvitation(request_id ? request_id : user_id)} loading={loadingDecline} disabled={disabled}/>
=======
                <CustomLargeBtn link='#' title='Accept' bgColor='accent_2' onClick={() => onClickAcceptInvitation(request_id ? request_id : user_id)} loading={loadingAccept} disabled={disabled}/>
                <CustomLargeBtn link='#' title='Decline' bgColor='accent_1' onClick={() => onClickDeclineInvitation(request_id ? request_id : user_id)} loading={loadingDecline} disabled={disabled}/>
>>>>>>> main
            </Stack>
        );
    }

    switch (type) {
        case 'add':
            bgColor = 'accent_2';
<<<<<<< HEAD
            title = t("profile-page.add");
=======
            title = 'Add Friend';
>>>>>>> main
            clickAction = () => onClickSendInvitation(user_id);
            break;
        case 'remove':
            bgColor = 'accent_1';
<<<<<<< HEAD
            title= t("profile-page.remove");
=======
            title = 'Remove Friend';
>>>>>>> main
            clickAction = () => onClickRemoveFriend(user_id);
            break;
        default:
            bgColor = 'secondary_1';
<<<<<<< HEAD
            title= t("profile-page.add");
=======
            title = 'Add Friend';
>>>>>>> main
            clickAction = () => onClickSendInvitation(user_id);
            break;
    }

<<<<<<< HEAD
    return (<CustomBtn variant={variant} link='#' title={title} bgColor={bgColor} onClick={clickAction} loading={loading} disabled={disabled}/>);
=======
    return (<CustomLargeBtn link='#' title={title} bgColor={bgColor} onClick={clickAction} loading={loading} disabled={disabled}/>);
>>>>>>> main
}


const MbFriendInteraction = ({ type, size, user_id, request_id }: FriendActionProps) => {
    let IconComponent: React.ElementType;
    let bgColor: customColor;
    let clickAction: () => void;

    const {
        onClickAcceptInvitation,
        onClickDeclineInvitation,
        onClickSendInvitation,
        onClickRemoveFriend,
        loading,
        loadingAccept,
        loadingDecline,
        disabled
    } = useFriendAction();

    switch (type) {
        case 'add':
            IconComponent = PersonAddIcon;
            bgColor = 'accent_2';
            clickAction = () => onClickSendInvitation(user_id);
            break;
        case 'remove':
            IconComponent = PersonRemoveIcon;
            clickAction = () => onClickRemoveFriend(user_id);
            bgColor = 'accent_1';
            break;
        default:
            IconComponent = PersonAddIcon;
            bgColor = 'secondary_1';
            clickAction = () => onClickSendInvitation(user_id);
            break;
    }

    if (type === 'invitation') {
        return (
            <Stack>
                <CustomIconBtn Icon={CheckIcon} size={size} bgColor='accent_2' onClick={() => onClickAcceptInvitation(request_id ? request_id : user_id)} loading={loadingAccept} disabled={disabled} />
                <CustomIconBtn Icon={CloseIcon} size={size} bgColor='accent_1' onClick={() => onClickDeclineInvitation(request_id ? request_id : user_id)} loading={loadingDecline} disabled={disabled} />
            </Stack>
        );
    }
    return (<CustomIconBtn Icon={IconComponent} onClick={clickAction} size={size} bgColor={bgColor} loading={loading} disabled={disabled}/>);
};

export { MbFriendInteraction, WbFriendInteraction };
