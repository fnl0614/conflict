
import NotifPageContent from "../../features/notification/pages/NotifPageContent";
import { BodyLayoutCentered } from "../layouts/BodyLayout";

export default function Notifications() {

	const notifArray = [
		{id: '1', firstName: 'Anonymous', lastName: 'First', urlProfil: '/images/group1.jpg', content: 'Liked your post'},
		{id: '2', firstName: 'Gundam', lastName: 'Gquuuux', urlProfil: '/images/group2.jpg', content: 'Posted something'},
		{id: '3', firstName: 'Coder', lastName: 'Thiiiird', urlProfil: '', content: 'Posted on your group'},
		{id: '4', firstName: 'Fantomus', lastName: 'Fouuuur', urlProfil: '', content: 'Liked a post on your group'},
	]

	return (
		<BodyLayoutCentered>
			<NotifPageContent notifArray={notifArray} />
		</BodyLayoutCentered>
	)
}