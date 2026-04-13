import { Stack, Box } from "@mui/material";
import TitleBar from "../../components/ui/TitleBar";
import CustomTab from "../../components/ui/CustomTab";
import { CustomBtn } from "../../components/ui/CustomButton";
import type { customColor } from "../../data/sharedType";

type btnType = {
	title: string;
	btnColor: customColor;
	onClick?: () => void;
}

export interface SideBarProps {
	title?: string | null,
	items?: {
		text: string;
		link: string;
	}[] | undefined;
	upperBtn?: btnType
	lowerBtn?: btnType
	tabOrientation: 'horizontal' | 'vertical';
	Node?: React.ReactNode | null;
	upperSpace?: boolean;
	lowerSpace?: boolean;
	popUp?: {
		children: React.ReactNode;
		isVisible: boolean;
		setIsVisible: (visible: boolean) => void;
	}
}

export default function CustomSideBar({
	title,
	items: itemArray,
	upperBtn,
	upperSpace,
	lowerBtn,
	lowerSpace,
	tabOrientation,
	Node,
	popUp }: SideBarProps) {
	
	const { children, isVisible } = popUp || { children: null, isVisible: false };

	return (
		<Stack spacing={2} display={'flex'} direction={'column'} height={'85%'}>
			{title && <TitleBar title={title} backLink='/' Icon={null}/>}
			{
				upperBtn && 
				<Box
					justifyContent={'center'}
					display={'flex'}
				>
					<CustomBtn
						title={upperBtn.title}
						bgColor={upperBtn.btnColor}
						onClick={upperBtn.onClick}
					/>
				</Box>
			}
			{upperSpace && <Box flexGrow={1} />}
			{popUp && isVisible && <Box padding={5}>{children}</Box> }
			{itemArray && <CustomTab itemArray={itemArray} orientation={tabOrientation}/>}
			{lowerSpace && <Box flexGrow={1} />}
			{
				lowerBtn &&
				<Box justifyContent={'center'} display={'flex'}>
					<CustomBtn title={lowerBtn.title} bgColor={lowerBtn.btnColor} onClick={lowerBtn.onClick}/>
				</Box>
			}
			{ Node && <Box>{Node}</Box>}
		</Stack>
	)
  }
