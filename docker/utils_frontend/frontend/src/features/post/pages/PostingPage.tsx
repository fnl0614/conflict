import { Stack } from "@mui/material";
import TitleBar from "../../../shared/components/ui/TitleBar";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import CustomIconBtn from "../../../shared/components/ui/CustomIconBtn";
import CloseIcon from '@mui/icons-material/Close';
import PostCreationForm from "../components/form/PostCreationForm";

const CloseButton = () => {
    return (
        <CustomIconBtn
            link='/'
            Icon={CloseIcon}
            size={{width: '24px', height: '24px'}}
            bgColor='secondary_1'
        />
    );
}

export default function PostingPage() {
    const [t] = useTranslation("global");
    const title = t("post-page.title").toUpperCase();
    const screen = useOutletContext();

    return (
        <Stack width='stretch' spacing={5}>
            <TitleBar title={title} Icon={screen === 'mb' ? null : CloseButton}/>
            <PostCreationForm/>
        </Stack>
    );
}