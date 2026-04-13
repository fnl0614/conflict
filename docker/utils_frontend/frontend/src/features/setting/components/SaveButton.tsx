import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SaveButtonProps {
    disabledCondition?: boolean,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => Promise<void> | void
}

/* NOTE : 
    Changing some button proprety because error on changing language
*/
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
                px: 2,
                py: 1.5,
                borderRadius: 3,
                // width: '10%',
                width: 'fit-content',
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
