import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import UserAvatar from "../../profile/components/ui/UserAvatar";
import { getTimeDifference } from "../../../shared/utils/dateUtils";

interface PostAvatarProps {
    user_id: string;
    firstName: string;
    lastName: string;
    group_id?: string;
    groupName?: string;
    urlProfil?: string;
    created_at: Date;
}

export default function PostAvatar({ user_id, firstName, lastName, group_id, groupName, urlProfil, created_at }: PostAvatarProps) {
    return (
        <Stack direction='row' alignItems='center' spacing={2}>
            <UserAvatar id={user_id} urlProfil={urlProfil} />
            <Stack direction='column' spacing={0}>
                <Link to={`/users/${user_id}`} style={{ textDecoration: 'none' }}>{firstName} {lastName}</Link> 
                {group_id && groupName &&
                <Typography variant='caption' >
                    <Link to={`/groups/${group_id}`} style={{ textDecoration: 'none', contentVisibility: 'auto' }}>
                        {groupName}
                    </Link>
                </Typography>}
                <Typography variant="caption" color="text.secondary">
                    {getTimeDifference(created_at)}
                </Typography>
            </Stack>
        </Stack>
    );
}
