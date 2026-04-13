import { useMediaQuery } from 'react-responsive';

import { Button, Stack } from "@mui/material"
import RegularList from "../components/list/RegularList";
import RegularGrid from "../components/list/RegularGrid";
import type { ListingProps } from '../data/sharedType';

interface ListingLayoutProps  {
    listObj: {
        wbChildren: React.ReactNode,
        mbChildren: React.ReactNode,
        list: ListingProps,
        wbItemComponent : React.ComponentType<any>,
        mbItemComponent : React.ComponentType<any>
        currentPage?: number,
        setPage?: React.Dispatch<React.SetStateAction<number>>
    }
}

export default function ListingLayout({ listObj }: ListingLayoutProps) {
	const isMobile = useMediaQuery({ maxWidth: 750 });
    const { wbChildren, mbChildren, list, wbItemComponent, mbItemComponent, currentPage, setPage } = listObj;
    const { items, resourceName } = list;

	if (isMobile) {
		return (
			<Stack spacing={2} padding={2} bgcolor={'white'}>
                {mbChildren}
                {(currentPage !== undefined && currentPage !== 0) &&
                    <Button onClick={() => setPage && setPage(currentPage - 1)} >Previous</Button>
                }
                <RegularList items={items} resourceName={resourceName} ItemComponent={mbItemComponent}/>
                {(currentPage !== undefined && items.length === 10) &&
                    <Button onClick={() =>  setPage && setPage(currentPage + 1)} >Next</Button>
                }
			</Stack>
		)
	}

	return (
		<Stack spacing={2} padding={5} bgcolor={'white'}>
            {wbChildren}
            {(currentPage !== undefined && currentPage !== 0) &&
                <Button onClick={() => setPage && setPage(currentPage - 1)} >Previous</Button>
            }
			<RegularGrid items={items} resourceName={resourceName} ItemComponent={wbItemComponent}/>
            {(currentPage !== undefined && items.length === 10) &&
                <Button onClick={() =>  setPage && setPage(currentPage + 1)} >Next</Button>
            }
		</Stack>
	)
}