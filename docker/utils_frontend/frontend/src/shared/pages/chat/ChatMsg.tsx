import { Stack } from "@mui/material";
import ChatMsgHeader from "../../../features/chat/layouts/ChatMsgHeader";
import ChatMsgList from "../../../features/chat/components/ui/ChatMsgList";
import ChatMsgInput from "../../../features/chat/components/ui/ChatMsgInput";

export default function ChatMsg() {

	const UserToChat = {
		id: '2',
		urlProfil: '/images/user2.jpg',
		firstName: 'John',
		lastName: 'Doe'
	};

	const chatMsgArray = [
		{ id: '1', urlProfil: '/images/user1.jpg', msg: 'Hello! How are you?', position: 'left', time: '06:00' },
		{ id: '2', urlProfil: '/images/user2.jpg', msg: 'Fiiiiiiiiiiiiiineeeeeeeeeee', position: 'right', time: '10:00' },
		{ id: '3', urlProfil: '/images/user1.jpg', msg: 'Sure', position: 'left' },
	];

	return (
		<Stack justifyContent={'space-between'} height={'100vh'} >
			<ChatMsgHeader 
				id={UserToChat.id}
				urlProfil={UserToChat.urlProfil}
				firstName={UserToChat.firstName}
				lastName={UserToChat.lastName}
			/>
			<ChatMsgList chatMsgArray={chatMsgArray}/>
			<ChatMsgInput />
		</Stack>
	)
}
