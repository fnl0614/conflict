import LoadingCircular from "../../../shared/components/LoadingCircular";

import i18next from "i18next"
import { I18nextProvider } from 'react-i18next';
import global_en from "../translation/en/translation.json"
import global_fr from "../translation/fr/translation.json"
import global_es from "../translation/es/translation.json"
import type { ChildrenNodeProps } from "../../../shared/data/sharedType";
import LanguageDetector from "i18next-browser-languagedetector";
import { useEffect, useState } from "react";

let i18nInitialized = false;

const LanguageProvider = ({ children } : ChildrenNodeProps) => {
    const [isInitialized, setIsInitialized] = useState(i18nInitialized);

    useEffect(() => {
        if (i18nInitialized) {
            setIsInitialized(true);
            return;
        }

        i18next
            .use(LanguageDetector)
            .init({
                interpolation: {
                    escapeValue: false
                },
                fallbackLng: "en",
                load: 'languageOnly',
                resources: {
                    en: { global: global_en },
                    fr: { global: global_fr },
                    es: { global: global_es }
                },
                detection: {
                    order: ["localStorage", "navigator"],
                    caches: ["localStorage"],
                },
            })
            .then(() => {
                i18nInitialized = true;
                setIsInitialized(true);
            })
            .catch((error) => {
                console.error("i18next initialization failed:", error);
                i18nInitialized = true;
                setIsInitialized(true);
            });
    }, []);

    if (!isInitialized) {
        return <LoadingCircular />;
    }

    return ( 
        <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    );
};

export default LanguageProvider;