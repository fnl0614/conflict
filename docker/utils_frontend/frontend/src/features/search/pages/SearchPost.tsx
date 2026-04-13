// import { useTranslation } from "react-i18next";

import ListingLayout from "../../../shared/layouts/ListingLayout";
import PostItem from "../../post/components/PostItem";

export default function SearchPost() {

	// const [t] = useTranslation("global");
	
	const items = [
        { id: 1, title: "test", content: "This is a test post content." },
        { id: 2, title: "hello", content: "Hello world! This is another post." },
        { id: 3, title: "lorem", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
	]

	return (
		<ListingLayout
			listObj={{
				wbChildren:(null),
				mbChildren:(null),
				list: {
					items: items,
					resourceName: "post",
					ItemComponent: null
				},
				wbItemComponent: PostItem,
				mbItemComponent: PostItem
			}}
		/>
	)
}