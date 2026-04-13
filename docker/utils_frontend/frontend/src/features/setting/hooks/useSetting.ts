import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAuth } from '../../authentication/context/AuthContext';
import { logout } from '../../authentication/services/authService';

const useSetting = () => {
	const [t] = useTranslation("global");
	const { userData, setUserData } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		setUserData(null);
		await logout();
		navigate("/login");
	}

    const handleNameChange = () => {
		navigate("/setting/name");
    }

    const handleEmailChange = () => {
        navigate("/setting/email");
    }

    const handlePasswordChange = () => {
        navigate("/setting/password");
    }

    const handleLanguageChange = () => {
        navigate("/setting/language");
    }

	const handleImageChange = () => {
		navigate("/setting/image");
	}

	const handleTermsOfService = () => {
		navigate("/setting/termsOfService");
	}

	const handlePrivacyPolicy = () => {
		navigate("/setting/privacyPolicy");
	}

	return {
		t,
		userData,
		setUserData,
		handleLogout,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
        handleLanguageChange,
		handleImageChange,
		handleTermsOfService,
		handlePrivacyPolicy
	}
}

export default useSetting;
