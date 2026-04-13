import { useState } from 'react';
import i18next from 'i18next';

const useLanguage = () => {
	const [ selectedLanguage, setSelectedLanguage ] = useState(i18next.language);
	const [ error, setError ] = useState<string | null>(null);

	const onSave = (lang : string) => {
		try {
			i18next.changeLanguage(lang);
		} catch (error) {
			console.error('Error changing language:', error);
			setError("An error occured, try again later");
		}
	};

	return {
		selectedLanguage,
		setSelectedLanguage,
		error,
		onSave
	};
}

export default useLanguage;

