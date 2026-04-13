import { Card, Typography } from "@mui/material";
import CustomAvatar from "./CustomAvatar";

interface AvatarSquareProps {
    id?: string;
    profileUrl: string;
    fullName: string;
    variant?: 'user' | 'group';
}

const AvatarSquare = ({ profileUrl: imageUrl, fullName, id, variant = 'user' }: AvatarSquareProps) => {

    return (
        <Card sx={{ maxWidth: 150, borderRadius: 2, display: 'flex', flexDirection: 'column'}}>
                <CustomAvatar
                    id={id}
                    urlProfil={imageUrl}
                    size={{ width: 100, height: 100 }}
                    isNotClickable={false}
                    variant={variant}
                    shape="square"
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
