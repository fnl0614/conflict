import { useTranslation } from "react-i18next";

import { Stack } from "@mui/material";
import TitleBar from "../../../shared/components/ui/TitleBar";
import NotifList from "../components/NotifList";
import type { NotifListProps } from "../components/NotifList";

export default function NotifPageContent({ notifArray } : NotifListProps) {

	const [t] = useTranslation("global");

	return (
		<Stack sx={{ paddingTop: 2 }}>
			<TitleBar title={t(`notif-page.title`)} backLink='/' Icon={null}/>
			<NotifList notifArray={notifArray}/>
		</Stack>
	)
}