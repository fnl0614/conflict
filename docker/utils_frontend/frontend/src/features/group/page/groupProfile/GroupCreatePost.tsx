import { BodyLayoutCentered } from "../../../../shared/layouts/BodyLayout";
import { RenderGroupState } from "../../components/RenderGroupState";
import { useGroup } from "../../hooks/useGroup";
import { Stack } from "@mui/material";
import TitleBar from "../../../../shared/components/ui/TitleBar";
import PostCreationForm from "../../../post/components/form/PostCreationForm";
import CloseIcon from '@mui/icons-material/Close';
import useScreenMobile from "../../../../shared/hooks/useScreen";
import { useUtils } from "../../../../shared/hooks/useUtils";

const GroupCreatePost = () => {

	const { groupData, status, error } = useGroup();
	const isMobile = useScreenMobile();
	const { t } = useUtils();
	const title = t("post-page.title").toUpperCase();

	if (status != 'success' || !groupData) {
		return <RenderGroupState status={status} groupData={groupData} error={error} />;
	}

	return (
		<BodyLayoutCentered>
			<Stack width='stretch' spacing={5}>
				<TitleBar title={title} Icon={isMobile ? null : CloseIcon}/>
            	<PostCreationForm group_id={groupData.group.id}/>
        	</Stack>
		</BodyLayoutCentered>
	)
}

export default GroupCreatePost;