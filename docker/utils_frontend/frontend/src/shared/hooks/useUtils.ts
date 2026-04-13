import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const useUtils = () => {
    const { t } = useTranslation("global");
    const navigate = useNavigate();

    return { t, navigate };
}

export { useUtils };