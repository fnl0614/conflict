import i18next from "i18next"
import { I18nextProvider } from 'react-i18next';
import global_en from "../translation/en/translation.json"
import global_fr from "../translation/fr/translation.json"
import global_ar from "../translation/ar/translation.json"

i18next.init({
	interpolation: {escapeValue: false},
	lng: "en",
	resources: {
		en: { global: global_en },
		fr: { global: global_fr },
		ar: { global: global_ar }
	}
})

interface LanguageProviderProps {
    children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {	
	return ( 
		<I18nextProvider i18n={i18next}>{children}</I18nextProvider>
	);
};

export default LanguageProvider;