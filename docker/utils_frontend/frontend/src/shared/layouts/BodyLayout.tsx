import { Outlet, useOutletContext } from 'react-router';
import WebBodyLayout from './web/WebBodyLayout';
import CustomSideBar from './web/CustomSideBar';
import MobileBodyLayoutWithConditions from './mobile/MobileBodyLayout';
import { Paper, Stack } from '@mui/material';
import type { ReactNode } from 'react';

const BodyLayoutCentered = ( { children }: { children: ReactNode }) =>
{
	const screen = useOutletContext();

	return (
		<>
			{
				screen === 'mb' ? 
				<Stack paddingTop={2}>
					{children}
				</Stack> :
				<WebBodyLayout>
					{null}
					<Paper sx={{ padding: 2}}>{children}</Paper>
				</WebBodyLayout>

			}
		</>
	)
}

const BodyLayoutWithConditions = ( { mobileItem, sidebarItem }: any ) => {

	const screen = useOutletContext();

	const { title, items, upperBtn, lowerBtn, upperSpace, lowerSpace, tabOrientation, Node } = sidebarItem;
 
    const { Index, path } = mobileItem;

	return (
		<>
			{
				screen === 'mb' ?
                <MobileBodyLayoutWithConditions Index={Index} path={path} /> :
				<WebBodyLayout>
					{ sidebarItem ?
                        <CustomSideBar
                            title={title}
                            items={items}
                            upperBtn={upperBtn}
							upperSpace={upperSpace}
                            lowerBtn={lowerBtn}
							lowerSpace={lowerSpace}
                            tabOrientation={tabOrientation}
                            Node={Node}
					    /> : null
                    }
					<Outlet/>
				</WebBodyLayout>
			}
		</>
    )
}

export { BodyLayoutCentered, BodyLayoutWithConditions };