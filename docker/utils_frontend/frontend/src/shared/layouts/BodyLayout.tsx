import { Outlet, useOutletContext } from 'react-router';
import WebBodyLayout from './web/WebBodyLayout';
import CustomSideBar from './web/CustomSideBar';
import MobileBodyLayoutWithConditions from './mobile/MobileBodyLayout';
import { Box, Paper } from '@mui/material';
import type { ReactNode } from 'react';

const BodyLayoutCentered = ( { children }: { children: ReactNode }) =>
{
	const screen = useOutletContext();

	return (
		<>
			{
				screen === 'mb' ? children :
				<WebBodyLayout>
					{null}
					<Box sx={{ mx: 'auto', maxWidth: 800}}>
						<Paper>{children}</Paper>
					</Box>
				</WebBodyLayout>

			}
		</>
	)
}

const BodyLayoutWithConditions = ( { mobileItem, sidebarItem }: any ) => {

	const screen = useOutletContext();
 
    const { Index, path } = mobileItem;

	return (
		<>
			{
				screen === 'mb' ?
                <MobileBodyLayoutWithConditions Index={Index} path={path} /> :
				<WebBodyLayout>
					{ sidebarItem ?
                        <CustomSideBar
                            title={sidebarItem.title}
                            items={sidebarItem.items}
                            upperBtn={sidebarItem.upperBtn}
                            lowerBtn={sidebarItem.lowerBtn}
                            tabOrientation={sidebarItem.tabOrientation}
                            Node={sidebarItem.Node}
					    /> : null
                    }
					<Outlet/>
				</WebBodyLayout>
			}
		</>
    )
}

export { BodyLayoutCentered, BodyLayoutWithConditions };