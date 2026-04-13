import { useTranslation } from "react-i18next";

const LanguageSelector = (lang: string) => {
    const i18n = useTranslation("global")[1];

    i18n.changeLanguage(lang);
    document.dir = lang === "ar"? "rtl" : "ltr";
    document.documentElement.lang = lang;
}

export default LanguageSelector;
