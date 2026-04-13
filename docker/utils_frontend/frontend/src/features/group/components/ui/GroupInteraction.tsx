import { useAuth } from '../../../authentication/context/AuthContext';
import { InvitationActionBtn, QuitGroupBtn } from './GroupBtn';

interface GroupInteractionProps {
	type: string;
	groupId: string;
	requestId?: string;
	variant? : 'extended' | 'normal';
}

const GroupInteraction = ({ type, groupId, variant = 'normal', requestId = '' }: GroupInteractionProps) => {

	const {userData} = useAuth();
	const userId = userData?.id || '';

	switch (type) {
		case 'quit':
			return <QuitGroupBtn groupId={groupId} userId={userId} variant={variant}/>;
		case 'invitation':
			return <InvitationActionBtn requestId={requestId}/>;
		default:
			return null;
	}
}

export default GroupInteraction;
