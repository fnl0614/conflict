import { Card, Typography } from "@mui/material";
import CustomAvatar from "./CustomAvatar";

interface AvatarSquareProps {
<<<<<<< HEAD:docker/utils_frontend/frontend/src/shared/components/ui/AvatarSquare.tsx
    id?: string;
    profileUrl: string;
    fullName: string;
    variant?: 'user' | 'group';
=======
    imageUrl: string;
    altText: string;
    name: string;
    id?: string;
>>>>>>> main:docker/utils_frontend/frontend/src/features/profile/components/ui/AvatarSquare.tsx
}

const AvatarSquare = ({ profileUrl: imageUrl, fullName, id, variant = 'user' }: AvatarSquareProps) => {

    return (
        <Card sx={{ maxWidth: 150, borderRadius: 2, display: 'flex', flexDirection: 'column'}}>
<<<<<<< HEAD:docker/utils_frontend/frontend/src/shared/components/ui/AvatarSquare.tsx
                <CustomAvatar
                    id={id}
                    urlProfil={imageUrl}
                    size={{ width: 100, height: 100 }}
                    isNotClickable={false}
                    variant={variant}
                    shape="square"
=======
            <CardActionArea href={`/users/${id}`}>
                <CardMedia
                    component="img"
                    src={imageUrl}
                    alt={altText}
                    sx={{ width: 150, height: 150, objectFit: 'cover', margin: 'auto' }}
>>>>>>> main:docker/utils_frontend/frontend/src/features/profile/components/ui/AvatarSquare.tsx
                />
                <Typography 
                    variant="subtitle1" 
                    align="center" 
                    color="text.primary" 
                    sx={{ 
                        padding: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {fullName}
                </Typography>
        </Card>
    )
}

export default AvatarSquare;
