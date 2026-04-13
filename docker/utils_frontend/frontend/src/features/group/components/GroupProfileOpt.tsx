import { Stack } from "@mui/material";
import { PostBtn, GoSendInvitationBtn, SettingBtn } from "./ui/GroupBtn";
import GroupInteraction from "./ui/GroupInteraction";
import useScreenMobile from "../../../shared/hooks/useScreen";

interface GroupProfileOptProps {
	role: string;
	groupId: string;
}

interface GroupProfileOptLayoutProps {
	element : {
		left: React.ReactNode;
		right: React.ReactNode;
		middle: React.ReactNode;
	}
}

const GroupProfileOptLayout = ({ element } : GroupProfileOptLayoutProps ) => {
	const isMobile = useScreenMobile();
	const { left, right, middle } = element;
	const direction = isMobile ? 'column' : 'row';
	const limitWidth = isMobile ? 'fit-content' : '100%';

	return (
		<Stack
			direction={direction}
			justifyContent='center'
			spacing={1}
			display={'flex'}
			sx={{ width: limitWidth, marginX: 'auto' }}
		>
            {left}
			{middle}
            {right}
		</Stack>
	)
}

export default function GroupProfileOpt({ role, groupId } : GroupProfileOptProps) {

	switch(role){
		case 'ADMIN':
			return (
				<GroupProfileOptLayout element={{
					left: <PostBtn groupId={groupId} />,
					middle: <GoSendInvitationBtn groupId={groupId} />,
					right: <SettingBtn groupId={groupId} />,
				}} />)
		default:
            return (
                <GroupProfileOptLayout element={{
                    left: <PostBtn groupId={groupId} />,
					middle: <GoSendInvitationBtn groupId={groupId} />,
                    right: <GroupInteraction type='quit' groupId={groupId}/>,
            }} />)
	}
}
