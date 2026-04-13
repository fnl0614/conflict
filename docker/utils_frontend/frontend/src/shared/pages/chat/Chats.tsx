import ChatPageContent from "../../../features/chat/layouts/ChatPageContent";
import { BodyLayoutWithConditions } from "../../layouts/BodyLayout";

export default function Chats() {

	return (
		<>
			<BodyLayoutWithConditions 
				mobileItem={{ Index: ChatPageContent, path: '/chats' }} 
				sidebarItem={{
					Node: <ChatPageContent/>,
					tabOrientation: "vertical"
				}}
			/>
		</>
	)
}
