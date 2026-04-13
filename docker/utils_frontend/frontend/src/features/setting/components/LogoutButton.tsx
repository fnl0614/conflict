import { Button } from '@mui/material';

interface LogoutButtonProps {
    onClick?: () => Promise<void> | void;
    content: string;
}

export default function LogoutButton({onClick = () => {}, content} : LogoutButtonProps)
{
    return (
        <Button
            variant="contained"
            sx={{
                px: 6,
                py: 1.5,
                borderRadius: 3,
                width: '10%',
                bgcolor: '#EA4186',
                color: '#fff'
            }}
            onClick={onClick}
            color='error'
        >
            {content}
        </Button>
    );
}
