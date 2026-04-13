import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SaveButtonProps {
    disabledCondition?: boolean,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => Promise<void> | void
}

export default function SaveButton({disabledCondition = false, type = undefined, onClick = () => {}} : SaveButtonProps)
{
    const [t] = useTranslation("global");

    return (
        <Button
            variant="contained"
            type={type}
            sx={{
                bgcolor: 'accent_2.main',
                color: '#fff',
                px: 6,
                py: 1.5,
                borderRadius: 3,
                width: '10%',
                alignSelf: 'center',
                '&:hover': { bgcolor: '#14cfa0' },
            }}
            onClick={onClick}
            disabled={disabledCondition}
        >
            {t("setting-page.save")}
        </Button>
    );
}
