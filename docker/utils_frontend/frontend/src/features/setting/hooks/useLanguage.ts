import React from 'react';
// import LanguageSelector from '../../language/hooks/LanguageSelector';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const useLanguage = () => {
  const [t] = useTranslation("global");
  const [language, setLanguage] = React.useState('');
  const navigate = useNavigate();
  const onSave = (lang: string) => {
    // TODO ask why the LanguageSelector doesn't work
    // LanguageSelector(lang);
    lang as string;
    navigate("/setting");
  }

  return {
    t,
    language,
    setLanguage,
    onSave
  };
}

export default useLanguage;

