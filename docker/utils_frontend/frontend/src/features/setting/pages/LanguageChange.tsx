import {
    Stack,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveButton from '../components/SaveButton';
import useLanguage from '../hooks/useLanguage';
import TitleBar from '../../../shared/components/ui/TitleBar';

/*UPDATE: Adding name to the select form for HTML norm */
export default function LanguageSettingPage() {
    const {
        t,
        language,
        setLanguage,
        onSave
    } = useLanguage();

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
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        IconComponent={ExpandMoreIcon}
                        sx={{
                            backgroundColor: '#ECECEC',
                            borderRadius: 2,
                            px: 2,
                        }}
                    >
                        <MenuItem key={'en'} value={"en"}>
                            {"English"}
                        </MenuItem>
                        <MenuItem key={'fr'} value={"fr"}>
                            {"French"}
                        </MenuItem>
                        <MenuItem key={'ar'} value={"ar"}>
                            {"Arabic"}
                        </MenuItem>
                    </Select>
                </FormControl>
                <SaveButton onClick={() => onSave(language)} disabledCondition={!language}/>
            </Stack>
        </Stack>
    );
}

