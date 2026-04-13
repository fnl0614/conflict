import { useState, type ElementType } from "react";
import TitleBar from "./ui/TitleBar";
import SwitchBtn, { type SwitchBtnItem } from "./ui/SwitchBtn";

interface CommonGroupsAndFriendsProps {
	title: string;
    backlink?: string;
	items: SwitchBtnItem[];
    Icon?: ElementType | null;
    IconOnclick?: () => void;
}

const DisplaySwitchBtn = ({ title, backlink, items, Icon, IconOnclick } : CommonGroupsAndFriendsProps) => {

    const [activeText, setActiveText] = useState<string>(items[0].text);

    return (
        <>
            <TitleBar title={title} backLink={backlink} Icon={Icon} IconOnClick={IconOnclick}/>
            <SwitchBtn buttons={items} activeText={activeText} setActiveText={setActiveText}/>
        </>
    )
}

export default DisplaySwitchBtn;
