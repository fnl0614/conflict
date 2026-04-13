import type { SxProps, Theme } from "@mui/material";

export interface ChildrenNodeProps {
    children: React.ReactNode;
}

export interface HeaderChildProps{
    iconStyle: SxProps<Theme>,
}

export type customColor = 'accent_1' | 'accent_2' | 'secondary_1' | 'secondary_2' | 'primary_2' | 'primary_1';

export type sectionType = {
	title: string,
	content: string
}
export interface ListingProps {
	items : any[],
	resourceName : string,
	ItemComponent? : React.ComponentType<any> | null
}
