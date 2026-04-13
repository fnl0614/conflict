import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";

interface AvatarSquareProps {
    imageUrl: string;
    altText: string;
    name: string;
    id?: string;
}

const AvatarSquare = ({ imageUrl, altText, name, id }: AvatarSquareProps) => {
    return (
        <Card sx={{ maxWidth: 150, borderRadius: 2, display: 'flex', flexDirection: 'column'}}>
            <CardActionArea href={`/users/${id}`}>
                <CardMedia
                    component="img"
                    src={imageUrl}
                    alt={altText}
                    sx={{ width: 150, height: 150, objectFit: 'cover', margin: 'auto' }}
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
                    {name}
                </Typography>
            </CardActionArea>
        </Card>
    )
}

export default AvatarSquare;
