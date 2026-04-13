import { useState } from "react";
import TitleBar from "./ui/TitleBar";
import SwitchBtn, { type SwitchBtnItem } from "./ui/SwitchBtn";

/* THIS WILL BE REPLACED BY SWITCH BTN */

interface CommonGroupsAndFriendsProps {
	title: string;
    backlink?: string;
	items: SwitchBtnItem[];
}

const DisplaySwitchBtn = ({title, backlink, items} : CommonGroupsAndFriendsProps) => {

    const [activeText, setActiveText] = useState<string>(items[0].text);

    return (
        <>
            <TitleBar title={title} backLink={backlink}/>
            <SwitchBtn buttons={items} activeText={activeText} setActiveText={setActiveText}/>
        </>
    )
}

export default DisplaySwitchBtn;
