import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import TitleBar from "../../../shared/components/ui/TitleBar";
import SearchBar from "../../search/components/ui/SearchBar";
import RegularList from "../../../shared/components/list/RegularList";
import ChatItem from "../components/general/ChatItem";

export default function ChatPageContent() {

	const [t] = useTranslation('global');
	const title = t(`chat-page.title`);

	const chatArray = [
		{id: 1, firstName: 'Anonymous', lastName: 'First', urlProfil: '/images/group1.jpg', msg: 'fdsfdsfdsfdsfdfdddddddddddddfsfddfdfddfd', unseen: true},
		{id: 2, firstName: 'Aaaaaaah', lastName: 'Second', urlProfil: '/images/group2.jpg', msg: 'This is just a message', unseen: false},
		{id: 3, firstName: 'Coder', lastName: 'Thiiiird', urlProfil: '', msg: 'Nothing really', unseen: true},
		{id: 4, firstName: 'Fantomus', lastName: 'Fouuuur', urlProfil: '', msg: 'Hello! How are you?', unseen : false},
	]

	return (
		<Stack paddingTop={2}>
            <TitleBar title={title} backLink='/' Icon={null}/>
            <Stack alignSelf={'center'} padding={2}><SearchBar /></Stack>
            <RegularList items={chatArray} resourceName={'chat'} ItemComponent={ChatItem}/>
        </Stack>
	)
}
