import { Paper, Stack } from "@mui/material";
import { useOutletContext } from "react-router";
import PostFeed from "../../../post/components/PostFeed";
import GroupPartialMemberList from "../../components/GroupPartialMemberList";
import { RenderGroupState } from "../../components/RenderGroupState";
import { useGroup } from "../../hooks/useGroup";

const GroupProfileContent = () => {
	const screen = useOutletContext();
	const { groupData, status, error } = useGroup();

	if (status != 'success' || !groupData) {
		return <RenderGroupState status={status} groupData={groupData} error={error} />;
	}

	const groupId = groupData.group.id;

	console.log("Group profile content", groupId);

	return (
		<>
			{
				screen === 'mb' ?
				<Stack>
					<GroupPartialMemberList groupId={groupId} />
					<PostFeed group_id={groupId} />
				</Stack>
				: <Paper sx={{ minWidth: 800, margin: 'auto'}}><PostFeed group_id={groupId}/></Paper>
			}
		</>
	)
}

export default GroupProfileContent;