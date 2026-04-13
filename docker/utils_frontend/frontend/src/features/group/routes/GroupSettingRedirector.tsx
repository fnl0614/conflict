import { Navigate, useLocation } from 'react-router-dom';
import GroupSetting from '../page/setting/GroupSetting';
import useScreenMobile from '../../../shared/hooks/useScreen';
import { RenderGroupState } from '../components/RenderGroupState';
import { useGroup } from '../hooks/useGroup';

const GroupSettingRedirector = () => {
	const location = useLocation();
	const isMobile = useScreenMobile();
	
	const { groupData, status, error } = useGroup();

	if (status != 'success' || !groupData) {
		return <RenderGroupState status={status} groupData={groupData} error={error} />;
	}

	const { group, role } = groupData;
	const { id: groupId } = group;
	const indexPath = `/group/${groupId}/setting`;

	if (role != 'ADMIN')
		return <Navigate to="/notFound" replace />;

	const isAtSettingRoot = location.pathname === indexPath;
  
	if (!isAtSettingRoot || isMobile)
		return <GroupSetting indexPath={indexPath} groupId={groupId} />;

	return <Navigate to="image" replace />;
}

export default GroupSettingRedirector;