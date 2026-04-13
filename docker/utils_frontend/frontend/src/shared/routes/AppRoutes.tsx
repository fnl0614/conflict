import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login from '../pages/entrypoint/Login';
import Register from '../pages/entrypoint/Register';
import Home from '../pages/Home';
import NotFound from '../pages/error/NotFound';

import Groups from '../pages/Groups';
import GroupInvitation from '../../features/group/page/GroupInvitation';
import GroupList from '../../features/group/page/GroupList';
import GroupOther from '../../features/group/page/GroupOther';

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
import UserGroupList from '../../features/group/page/UserGroupList';
import UserFriendList from '../../features/friend/pages/UserFriendList';

import SettingRedirector from '../../features/setting/routes/SettingRedirector';
import Images from '../../features/setting/pages/Images';
import NameChange from '../../features/setting/pages/NameChange'; 
import EmailChange from '../../features/setting/pages/EmailChange'; 
import PasswordChange from '../../features/setting/pages/PasswordChange'; 
import LanguageChange from '../../features/setting/pages/LanguageChange';
import Tos from '../../features/setting/pages/Tos';

import WebLayout from '../layouts/web/WebLayout';
import MobileLayout from '../layouts/mobile/MobileLayout';
import { useMediaQuery } from 'react-responsive';
import { Box } from '@mui/material';
import SearchPost from '../../features/search/pages/SearchPost';
import SearchGroup from '../../features/search/pages/SearchGroup';
import SearchUser from '../../features/search/pages/SearchUser';
import ImageCover from '../../features/setting/pages/ImageCover';
import ImageProfile from '../../features/setting/pages/ImageProfile';

const GeneralLayout = () => {

	const isMobile = useMediaQuery({ maxWidth: 750 });

	return (
		<Box sx={{ overflow: 'auto', height: '100vh'}}>
			<Box sx={{ minWidth: 350, height: '100%', minHeight: '100vh'}}>
				{
					isMobile ? 
					<MobileLayout ><Outlet context={'mb'}/></MobileLayout> : 
					<WebLayout ><Outlet context={'wb'}/></WebLayout>
				}
			</Box>
		</Box>
	)
}

const AppRoutes: React.FC = () => {
	return ( 
		<Routes>
			<Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>} />
			<Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>} />
			<Route path='/notFound' element={<NotFound />} />
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
					<Route path='list' element={<GroupList />} />
					<Route path='other' element={<GroupOther />} />
				</Route>
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
					<Route path="tos" element={<Tos />} />
				</Route>
			</Route>
			<Route path='*' element={<Navigate to="/notFound" replace />} />
		</Routes>
	);
};

export default AppRoutes;
