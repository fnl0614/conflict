import { Stack } from '@mui/material';

import TitleBar from '../../../shared/components/ui/TitleBar';
import PasswordForm from '../components/form/PasswordForm';
import { useTranslation } from 'react-i18next';

/* UPDATE: Adding width control for responsiveness*/
export default function NameChange() {
    const [t] = useTranslation("global");

    return (
        <Stack alignItems="center" spacing={4}>
            <TitleBar title={t(`setting-page.passwordTitle`)} backLink='/setting' />
            <Stack alignItems="center" spacing={4} sx={{ px: 2 }}>
                <Stack sx={{ maxWidth: '75%', minWidth: '25%'}}><PasswordForm/></Stack>
            </Stack>
        </Stack>
    );
}

