import { Stack } from '@mui/material';

import TitleBar from '../../../shared/components/ui/TitleBar';
import NameForm from '../components/form/NameForm';
import { useTranslation } from 'react-i18next';

export default function NameChange() {
    const [t] = useTranslation("global");

    return (
        <Stack alignItems="center" spacing={4}>
            <TitleBar title={t(`setting-page.nameTitle`)} backLink='/setting' />
            <Stack alignItems="center" spacing={4} sx={{ px: 4 }}>
                <NameForm />
            </Stack>
        </Stack>
    );
}
