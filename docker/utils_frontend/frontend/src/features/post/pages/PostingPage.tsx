import { Stack } from "@mui/material";
import TitleBar from "../../../shared/components/ui/TitleBar";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import PostCreationForm from "../components/form/PostCreationForm";
import CloseIcon from '@mui/icons-material/Close';

export default function PostingPage() {
    const [t] = useTranslation("global");
    const title = t("post-page.title").toUpperCase();
    const screen = useOutletContext();

    return (
        <Stack width='stretch' spacing={5}>
            <TitleBar title={title} Icon={screen === 'mb' ? null : CloseIcon}/>
            <PostCreationForm/>
        </Stack>
    );
}
