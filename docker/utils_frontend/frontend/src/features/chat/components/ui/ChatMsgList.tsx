import { Stack } from "@mui/material"
import ChatMsgObj, { type ChatMsgObjProps } from "./ChatMsgObj";

interface ChatMsgList{
		chatMsgArray: ChatMsgObjProps[]
}

export default function ChatMsgList( { chatMsgArray } : ChatMsgList) {
	return (
		<Stack gap={5}>
			{
				chatMsgArray.map(chatMsg => {
					return (
						<ChatMsgObj
							key={chatMsg.id}
							id={chatMsg.id}
							urlProfil={chatMsg.urlProfil}
							msg={chatMsg.msg}
							position={chatMsg.position}
							time={chatMsg.time}
						/>
					)
				})
			}
		</Stack>
	)
}
