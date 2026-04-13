import {
    Stack,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveButton from '../components/SaveButton';
import TitleBar from '../../../shared/components/ui/TitleBar';
import useLanguage from '../hooks/useLanguage';
import { useUtils } from '../../../shared/hooks/useUtils';

/*UPDATE: Adding name to the select form for HTML norm */
export default function LanguageSettingPage() {
    const {
        onSave,
        selectedLanguage,
        setSelectedLanguage,
        error
    } = useLanguage();

    const { t } = useUtils();

    return (
        <Stack spacing={6} alignItems="center">
            <TitleBar title={t("setting-page.langTitle")} backLink='/setting' />
            <Stack spacing={6} px={3} alignItems="center">
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ fontStyle: 'italic' }}
                >{t("setting-page.langDirective")}</Typography>
                <FormControl style={{width: '100%'}}>
                    <Select
                        name='language'
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        IconComponent={ExpandMoreIcon}
                        sx={{
                            backgroundColor: '#ECECEC',
                            borderRadius: 2,
                            px: 2,
                        }}
                    >
                        <MenuItem key={'en'} value={"en"}>
                            {t("language.en")}
                        </MenuItem>
                        <MenuItem key={'fr'} value={"fr"}>
                            {t("language.fr")}
                        </MenuItem>
                        <MenuItem key={'es'} value={"es"}>
                            {t("language.es")}
                        </MenuItem>
                    </Select>
                </FormControl>
                <SaveButton onClick={() => onSave(selectedLanguage)} disabledCondition={!selectedLanguage}/>
                {error && <Typography variant='body1'></Typography>}
            </Stack>
        </Stack>
    );
}

