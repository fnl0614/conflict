import { Stack } from '@mui/material';

import TitleBar from '../../../shared/components/ui/TitleBar';
import EmailForm from '../components/form/EmailForm';
import { useTranslation } from 'react-i18next';

export default function NameChange() {
    const [t] = useTranslation("global");

    return (
        <Stack alignItems="center" spacing={4}>
            <TitleBar title={t(`setting-page.emailTitle`)} backLink='/setting' />
            <Stack alignItems="center" spacing={4} sx={{ px: 4 }}>
                <EmailForm />
            </Stack>
        </Stack>
    );
}
