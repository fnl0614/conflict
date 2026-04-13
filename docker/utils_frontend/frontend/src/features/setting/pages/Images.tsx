import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DisplaySwitchBtn from '../../../shared/components/DisplaySwitchBtn';
import { Outlet, useOutletContext } from "react-router";

export default function ImageChange() {

    const [t] = useTranslation("global");
    const title = t(`setting-page.imageTitle`);
	const items = [
		{ text: t("setting-page.cover"), link: "/setting/image/cover"},
		{ text: t("setting-page.profile"), link: "/setting/image/profile"},
	];
    const screen = useOutletContext();

    return (
		<>
			{
                <Stack spacing={4}>
                    <DisplaySwitchBtn title={title} backlink='/setting' items={items} />
                    <Outlet context={screen}/>
                </Stack>
			}
		</>
    );
}
