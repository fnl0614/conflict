import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../features/authentication/context/AuthContext";
import { useTranslation } from "react-i18next";

const useWebHeader = () => {
	const [t] = useTranslation("global");
	const { userData } = useAuth();
	const [tabValue, setTabValue] =  useState<number | boolean>(0);
	const [ isClicked, setIsClicked ] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
		event as React.SyntheticEvent;
	};

	const location = useLocation();
  
	useEffect(() => {
	  switch (true) {
		case (location.pathname === '/'):
			setTabValue(0);
			break;
		case location.pathname.startsWith('/home'):
			setTabValue(0);
			break;
		case location.pathname.startsWith('/groups'):
			setTabValue(1);
			break;
		case location.pathname.startsWith('/friends'):
			setTabValue(2);
			break;
		case location.pathname.startsWith('/chats'):
			setTabValue(3);
			break;
		case location.pathname.startsWith('/notifications'):
			setTabValue(4);
			break;
		default:
			setTabValue(false);
	  }
	}, [location.pathname]);


    return (
        { t, userData, tabValue, isClicked, setIsClicked, navigate, handleChange }
    )
}

export default useWebHeader;
