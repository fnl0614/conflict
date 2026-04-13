import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import TermsOfService from '../pages/legal/TermsOfService';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';

import Login from '../pages/entrypoint/Login';
import Register from '../pages/entrypoint/Register';
import Home from '../pages/Home';

import Groups from '../pages/Groups';
import GroupInvitation from '../../features/group/page/main/GroupInvitation';
import GroupJoinedList from '../../features/group/page/main/GroupJoinedList';
import GroupOwnedList from '../../features/group/page/main/GroupOwnedList';

import Friends from '../pages/Friends';
import FriendInvitation from '../../features/friend/pages/FriendInvitation';
import FriendList from '../../features/friend/pages/FriendList';
import FriendOther from '../../features/friend/pages/FriendOther';

import Chats from '../pages/chat/Chats';
import ChatMsg from '../pages/chat/ChatMsg';

import Notifications from '../pages/Notifications';
import Search from '../pages/Search';
import Posts from '../pages/Post';

import Profile from '../pages/Profile';
import ProfileContent from '../../features/profile/pages/ProfileContent';
import UserGroupList from '../../features/group/page/userProfile/UserGroupList';
import UserFriendList from '../../features/friend/pages/UserFriendList';

import SettingRedirector from '../../features/setting/routes/SettingRedirector';
import Images from '../../features/setting/pages/Images';
import NameChange from '../../features/setting/pages/NameChange'; 
import EmailChange from '../../features/setting/pages/EmailChange'; 
import PasswordChange from '../../features/setting/pages/PasswordChange'; 
import LanguageChange from '../../features/setting/pages/LanguageChange';

import SearchPost from '../../features/search/pages/SearchPost';
import SearchGroup from '../../features/search/pages/SearchGroup';
import SearchUser from '../../features/search/pages/SearchUser';
import ImageCover from '../../features/setting/pages/ImageCover';
import ImageProfile from '../../features/setting/pages/ImageProfile';

import GroupProfile from '../pages/GroupProfile';
import GroupProfileContent from '../../features/group/page/groupProfile/GroupProfileContent';
import GroupMember from '../../features/group/page/groupProfile/GroupMember';
import GroupCreatePost from '../../features/group/page/groupProfile/GroupCreatePost';
import GroupNameChange from '../../features/group/page/setting/GroupNameChange';
import GroupImageCover from '../../features/group/page/setting/GroupImageCover';
import GroupImages from '../../features/group/page/setting/GroupImages';
import GroupImageProfile from '../../features/group/page/setting/GroupImageProfile';
import GroupMemberManagement from '../../features/group/page/setting/GroupMemberManagement';
import GroupSettingRedirector from '../../features/group/routes/GroupSettingRedirector';
import GroupInviteToJoin from '../../features/group/page/groupProfile/GroupInviteToJoin';
import GroupDescriptionChange from '../../features/group/page/setting/GroupDescriptionChange';

import CustomErrorPage from '../pages/error/CustomErrorPage';
import GroupProvider from '../../features/group/provider/GroupProvider';
import LoadingCircular from '../components/LoadingCircular';

import { SpecialLayout, GeneralLayout } from '../layouts/GeneralLayout';

import { useAuth } from '../../features/authentication/context/AuthContext';
import type { ChildrenNodeProps } from '../data/sharedType';

const ProtectedRoute = ({children} : ChildrenNodeProps) => {
	const { userData } = useAuth();
	const location = useLocation();

	if (userData === undefined)
		return <LoadingCircular />;
	if (!userData && location.pathname !== '/login' && location.pathname !== '/register')
		return <Navigate to={"/login"}/>;
	if (userData && (location.pathname === '/login' || location.pathname === '/register'))
        return <Navigate to={"/"} />;
	return children;
}

const AppRoutes: React.FC = () => {
	return ( 
		<Routes>
			<Route path='/termsOfService'element={<SpecialLayout><TermsOfService /></SpecialLayout>} />
			<Route path='/privacyPolicy'element={<SpecialLayout><PrivacyPolicy /></SpecialLayout>} />
			<Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>} />
			<Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>} />
			<Route path='/notFound' element={<CustomErrorPage error={'Page not Found'} status={404} />} />
			<Route element={<ProtectedRoute><GeneralLayout /></ProtectedRoute>}>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/users/:id' element={<Profile />}>
					<Route index element={<Navigate to="profile" replace />} />
					<Route path="profile" element={<ProfileContent/>}/>
					<Route path="friend" element={<UserFriendList/>}/>
					<Route path="group" element={<UserGroupList/>}/>
				</Route>
				<Route path='/notifications' element={<Notifications />} />
				<Route path='/posts' element={<Posts />} />
				<Route path='/groups' element={<Groups />} >
					<Route index element={<Navigate to="invitation" replace />} />
					<Route path='invitation' element={<GroupInvitation />} />
					<Route path='joined' element={<GroupJoinedList />} />
					<Route path='owned' element={<GroupOwnedList />} />
				</Route>
				<Route path="group/:id" element={<GroupProfile />}>
					<Route index element={<Navigate to="profile" replace />} />
					<Route path="profile" element={<GroupProfileContent />}/>
					<Route path="members" element={<GroupMember />}/>
				</Route>
				<Route path='group/:id/setting' element={<GroupProvider><GroupSettingRedirector /></GroupProvider>}>
					<Route path='image' element={<GroupImages />}>
						<Route index element={<Navigate to="cover" replace />} />
						<Route path='cover' element={<GroupImageCover />} />
						<Route path='profile' element={<GroupImageProfile />} />
					</Route>
					<Route path='name' element={<GroupNameChange />} />
					<Route path='description' element={<GroupDescriptionChange />} />
					<Route path='management' element={<GroupMemberManagement />} />
				</Route>
				<Route path="group/:id/post" element={<GroupProvider><GroupCreatePost /></GroupProvider>}/>
				<Route path="group/:id/sendInvitation" element={<GroupProvider><GroupInviteToJoin /></GroupProvider>}/>
				<Route path='/friends' element={<Friends />} >
					<Route index element={<Navigate to="invitation" replace />} />
					<Route path='invitation' element={<FriendInvitation />} />
					<Route path='list' element={<FriendList />} />
					<Route path='other' element={<FriendOther />} />
				</Route>
				<Route path='/chats' element={<Chats />} >
					{/*Add the chats nested routes here*/}
					<Route path='chatMsg' element={<ChatMsg />} />
				</Route>
				<Route path='/search' element={<Search />} >
					<Route index element={<Navigate to="posts" replace />} />
					<Route path='posts' element={<SearchPost />} />
					<Route path='groups' element={<SearchGroup />} />
					<Route path='users' element={<SearchUser />} />
				</Route>
				<Route path='/setting' element={<SettingRedirector/>}>
					<Route path='image' element={<Images />}>
                        <Route index element={<Navigate to="cover" replace />} />
                        <Route path='cover' element={<ImageCover />} />
                        <Route path='profile' element={<ImageProfile />} />
                    </Route>
					<Route path="name" element={<NameChange />} />
					<Route path="email" element={<EmailChange />} />
					<Route path="password" element={<PasswordChange />} />
					<Route path="language" element={<LanguageChange />} />
					<Route path="termsOfService" element={<TermsOfService />} />
					<Route path="privacyPolicy" element={<PrivacyPolicy />} />
				</Route>
			</Route>
			<Route path='*' element={<Navigate to="/notFound" replace />} />
		</Routes>
	);
};

export default AppRoutes;
