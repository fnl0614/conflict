import { CardContent, Typography, Stack } from "@mui/material";

interface PostContentProps {
    text: string;
}

export default function PostContent({ text } : PostContentProps) {
    return (
        <CardContent sx={{ padding: 1 }}>
            <Stack sx={{ px: 1 }}>
                {
                    text.split('\n').map((line, index) => (
                        <Typography key={index} variant='body2'>
                            {line.length === 1 ? <br /> : line}
                        </Typography>
                    ))
                }
            </Stack>
        </CardContent>
    );
}