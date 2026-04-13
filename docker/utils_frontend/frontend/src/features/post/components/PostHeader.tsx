import usePostHeader from "../hooks/usePostHeader";
import { CardHeader, IconButton } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import PostAvatar from "./PostAvatar";

interface PostHeaderProps {
    author : {
        ownerId : string;
        ownerFirstName : string;
        ownerLastName : string;
        ownerImageUrl ?: string;
    }
    groupId ?: string;
    groupName ?: string;
    handleOpen : () => void;
    created_at: Date;
}

export default function PostHeader({ author, groupId, groupName, handleOpen, created_at } : PostHeaderProps) {
  const { ownerId, ownerFirstName, ownerLastName, ownerImageUrl } = author;
  const { isOwner, isInGroup } = usePostHeader(ownerId, groupId, groupName);

  return (
    <CardHeader
        avatar={
            <PostAvatar
                user_id={ownerId}
                firstName={ownerFirstName}
                lastName={ownerLastName}
                group_id={groupId}
                groupName={groupName}
                urlProfil={ownerImageUrl}
                created_at={created_at}
            />
        }
        action={
            (isOwner && !isInGroup) ?
                <IconButton onClick={handleOpen}>
                    <ClearTwoToneIcon />
                </IconButton>
            : null
        }
      sx={{ padding: 1 }}
    />
  );
}
