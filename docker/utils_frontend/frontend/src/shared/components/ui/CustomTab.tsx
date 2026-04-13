import { Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { strCapitalize } from "../../utils/stringUtils";
import { useLocation, useNavigate } from "react-router";

interface CustomTabProps {
	itemArray?: {
		text: string;
		link: string;
		Icon?: React.ElementType;
	}[],
	orientation: 'horizontal' | 'vertical';
}

export default function CustomTab({ itemArray, orientation }: CustomTabProps) {

	const [value, setValue] =  useState(0);
	const navigate = useNavigate();
	const location = useLocation();
  
	useEffect(() => {
		itemArray?.map((item, index) => {
		if (location.pathname.includes(item.link)) {
			setValue(index);
		}
	})
	}, [location.pathname]);

	return (
			<Tabs
				value={value}
				orientation={orientation}
				onChange={(e, val) => { setValue(val); e.preventDefault(); }}
			>
				{itemArray? itemArray.map((item) => (
				<Tab
					key={item.text}
					label={strCapitalize(item.text)}
					sx={{ 
						fontWeight: 'bold',
						textTransform: 'none',
						fontSize: 16,
						...(orientation === 'horizontal' && {
							marginX: 5
						}),
						...(orientation === 'vertical' && {
						justifyContent: 'flex-start',
						width: '100%',
						maxWidth: 'none'})
					}}
					icon={item.Icon ? <item.Icon /> : undefined}
					iconPosition="start"
					onClick={() => { navigate(item.link) }}
				/>
				)): null}
			</Tabs>
	)
  }